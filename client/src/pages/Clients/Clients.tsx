import { useEffect, useState } from "react";
import { Client, clientsOnPage } from "../../data/clients";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ClientTable from "../../components/TagTable/TagsTable";

type ClientsPageProps = {
  listOfClients: Array<Client>;
};

const Clients = ({ listOfClients }: ClientsPageProps) => {
  const [clients, setClients] = useState<Array<Client>>(clientsOnPage);
  const [clientsForTable, setClientsForTable] = useState<Array<Client>>([]);
  const [typeOfClients, setTypeOfClients] = useState<string>("active");
  const [newClientName, setNewClientName] = useState<string>("");

  useEffect(() => {
    if (typeOfClients === "archived")
      setClientsForTable(clients.filter((el) => el.archived === true));
    else if (typeOfClients === "active")
      setClientsForTable(clients.filter((el) => el.archived === false)
      );
    else setClientsForTable([...clients]);
    console.log(clients);
  }, [typeOfClients]);

  const handleChange = (event) => {
    setTypeOfClients(event.target.value);
  };

  const handleAddClient = () => {
    clients.push({
      id: clients.length + 1,
      fullName: newClientName,
      archived: false
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: "1", width: "100%" }}>
        <Typography
          sx={{ fontSize: "25px", marginLeft: "20px", marginTop: "20px" }}
        >
          Tags
        </Typography>
      </Box>
      <Box sx={{ display: "flex", margin: "10px" }}>
        <Box sx={{ minWidth: 120, display: "flex", flex: "1" }}>
          <FormControl sx={{ margin: "20px", maxWidth: 200, flex: "1" }}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={typeOfClients}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"active"}>Show active</MenuItem>
              <MenuItem value={"archived"}>Show archived</MenuItem>
              <MenuItem value={"all"}>Show all</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flex: "1", maxWidth: 250, minWidth: 150 }}>
            <TextField
              id="clients-search"
              label="Search by name"
              variant="outlined"
              sx={{ margin: "20px" }}
            />
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <TextField
              id="add-new-client"
              label="Add new client"
              variant="outlined"
              value={newClientName}
              sx={{ margin: "20px", flex: "1", maxWidth: "50%", minWidth: 150 }}
              onChange={(e) => setNewClientName(e.target.value)}
            />
            <Box>
              <Button variant="contained" size="large" onClick={handleAddClient}>
                ADD
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "70%", display: "flex", justifyContent: "center" }}>
        <ClientTable typeOfClients={typeOfClients} clientForPage={clientsForTable} />
      </Box>
    </Box>
  );
};

export default Clients;
