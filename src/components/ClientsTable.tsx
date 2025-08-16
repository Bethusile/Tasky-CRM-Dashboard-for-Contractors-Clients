// src/components/ClientsTable.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define the interface for a single client
interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
}

// Define the props interface for the component
interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Contact Person</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>{client.contactPerson}</TableCell>
            <TableCell>{client.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;