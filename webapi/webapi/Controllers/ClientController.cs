using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DTO;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("client")]
    public class ClientController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<ClientController> _logger;

        public ClientController(ILogger<ClientController> logger, TimeTrackerDbContext context)
        {
            _logger = logger;
            context = context;
        }

        #region GET

        [HttpGet]
        [Route("/")]
        public async Task<ActionResult> GetAllClients()
        {
            var clients = await context.Clients.ToListAsync();
            
            if(clients == null)
            {
                return NotFound();
            }

            return Ok(clients);
        }

        [HttpGet]
        [Route("/archived")]
        public async Task<ActionResult> GetArchivedClients()
        {
            var archivedClient = await context.Clients.Where(client => client.Archived == true).ToListAsync();

            if(archivedClient == null)
            {
                return NotFound();
            }

            return Ok(archivedClient);
        }

        [HttpGet]
        [Route("/active")]
        public async Task<ActionResult> GetActiveClients()
        {
            var activeClients = await context.Clients.Where(client => client.Archived == false).ToListAsync();

            if(activeClients == null)
            {
                return NotFound();
            }

            return Ok(activeClients);
        }

        [HttpGet]
        [Route("/filteredByName/{pattern}")]
        public async Task<ActionResult> GetClientsFilteredByName(string pattern)
        {
            var filteredClients = await context.Clients.Where(client => client.Name.Contains(pattern)).ToListAsync();

            if(filteredClients == null)
            {
                return NotFound();
            }

            return Ok(filteredClients);
        }

        #endregion

        #region POST

        [HttpPost]
        [Route("/")]
        public async Task<ActionResult> AddClient([FromBody] AddClientDTO clientBody)
        {
            try
            {
                if(clientBody == null)
                {
                    return BadRequest("Invalid data!");
                }

                Client client = new Client();
                client.Name = clientBody.Name;
                client.Archived = false;
                client.Address = string.Empty;
                client.Email = string.Empty;
                client.Note = string.Empty;

                context.Clients.Add(client);
                await context.SaveChangesAsync();

                return Ok(client);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        #endregion

        #region PUT

        [HttpPut]
        [Route("/changeStatus/{id}")]
        public async Task<ActionResult> ChangeClientStatus(int clientId)
        {
            try
            {
                var clientForChange = await context.Clients.Where(client => client.Id == clientId).FirstOrDefaultAsync();

                if (clientForChange == null)
                {
                    return NotFound("Element not exist!");
                }

                Console.WriteLine(clientForChange.Archived);
                clientForChange.Archived = !clientForChange.Archived;
                Console.WriteLine(clientForChange.Archived);

                context.Clients.Update(clientForChange);
                await context.SaveChangesAsync();

                return Ok(clientForChange);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        #endregion

        #region DELETE

        //morace da se zameni kada dodam za projekte jer mora i tamo da se obrise isto
        [HttpDelete]
        [Route("/")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            try
            {
                var client = await context.Clients.Where(client => client.Id == id).FirstOrDefaultAsync();

                if(client == null)
                {
                    return NotFound("Client with this id don't exist");
                }

                context.Clients.Remove(client);
                await context.SaveChangesAsync();

                return Ok("User successfully deleted!");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

    }
}
