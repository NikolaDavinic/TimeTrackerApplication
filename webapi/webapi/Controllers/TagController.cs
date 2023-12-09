using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DTO.TagDTOs;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("tags")]
    public class TagController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<TagController> logger;

        public TagController(ILogger<TagController> _logger, TimeTrackerDbContext _context)
        {
            this.context = _context;
            this.logger = _logger;
        }

        #region GET

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAllTags()
        {
            var tags = await context.Tags.ToListAsync();

            if(tags == null)
            {
                return NotFound("There are no tags at this moment!");
            }

            return Ok(tags);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetTagById(int id)
        {
            var tagById = await context.Tags.Where(tag => tag.Id == id).FirstOrDefaultAsync();

            if(tagById == null)
            {
                return NotFound("Tag with this id not exist!");
            }

            return Ok(tagById);
        }

        #endregion

        #region POST

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> CreateTag([FromBody] AddTagDTO tagBody)
        {
            try
            {
                if(tagBody == null)
                {
                    return BadRequest("Invalid parameters");
                }

                Tag tag = new Tag();
                tag.Name = tagBody.Name;

                context.Add(tag);
                await context.SaveChangesAsync();

                return Ok(tag);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region PUT
        #endregion

        #region DELETE
        #endregion


    }
}
