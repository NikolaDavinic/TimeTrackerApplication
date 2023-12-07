import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Client, clients, clientsOnPage } from "../../data/clients";

type ClientTableProps = {
  typeOfClients: string;
  clientForPage: Array<Client>;
}

const ClientTable = ({typeOfClients, clientForPage}: ClientTableProps) => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [clients, setClients] = useState<Array<Client>>(clientForPage);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<number>();
  const [clientType, setClientType] = useState<string>('all');
  const [newName, setNewName] = useState("");

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = (clientId: number) => {
    setSelectedClient(clientId)
    console.log(clientId)
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleEditSave = () => {
    // Implement your logic to save the edited name
    console.log(`Saving edited name: ${newName}`);
    const newClient: Client = {
      id: (clients.length + 1),
      fullName: newName,
      archived: false
    }
    clients.push(newClient)
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting client: ${selectedClient}`);
    const newClients = [...clients];
    setClients(newClients.filter(el => el.id !== selectedClient))
    handleDeleteClose();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ display: "flex" }}>
        <Table
          sx={{ width: "500vh", maxWidth: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleEditOpen}>
                    <Icon sx={{ fontSize: 35 }}>edit</Icon>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDeleteOpen(row.id)}>
                    <Icon sx={{ fontSize: 35 }}>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Client Name</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the client "{selectedClient}"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
