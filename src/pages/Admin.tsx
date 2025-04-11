
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Ticket } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

const AdminPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [reportedTickets, setReportedTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
      return;
    }

    if (isAuthenticated && user) {
      checkAdminAccess();
    }
  }, [isAuthenticated, isLoading, user]);

  const checkAdminAccess = async () => {
    // In a real app, you would check for admin rights
    // For demo purposes, let's assume the first registered user is an admin
    fetchReportedTickets();
  };

  const fetchReportedTickets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*, reported_by:profiles!reported_by(name)')
        .eq('reported', true)
        .order('report_date', { ascending: false });
      
      if (error) throw error;
      
      setReportedTickets(data || []);
    } catch (error: any) {
      console.error('Error fetching reported tickets:', error);
      toast.error(error.message || 'Failed to load reported tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleTicketAction = async (ticketId: string, action: 'approve' | 'suspend') => {
    try {
      const newStatus = action === 'approve' ? 'active' : 'suspended';
      
      const { error } = await supabase
        .from('tickets')
        .update({
          status: newStatus,
          reported: action === 'approve' ? false : true
        })
        .eq('id', ticketId);
      
      if (error) throw error;
      
      toast.success(`Ticket ${action === 'approve' ? 'approved' : 'suspended'} successfully`);
      fetchReportedTickets();
    } catch (error: any) {
      toast.error(error.message || `Failed to ${action} ticket`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage reported tickets</p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading...</p>
            </div>
          ) : reportedTickets.length > 0 ? (
            <Table>
              <TableCaption>List of reported tickets</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      {ticket.report_date ? format(parseISO(ticket.report_date), 'MMM dd, yyyy') : 'Unknown'}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{ticket.from_city} → {ticket.to_city}</div>
                      <div className="text-sm text-muted-foreground">{ticket.mode} - {format(parseISO(ticket.travel_date), 'MMM dd')}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">{ticket.report_reason}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Reported by: {ticket.reported_by?.name || 'Unknown user'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : ticket.status === 'suspended' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {ticket.status !== 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center text-green-600"
                            onClick={() => handleTicketAction(ticket.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        )}
                        {ticket.status !== 'suspended' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center text-red-600"
                            onClick={() => handleTicketAction(ticket.id, 'suspend')}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Suspend
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No reported tickets</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are currently no tickets reported by users.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
