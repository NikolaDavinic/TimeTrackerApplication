namespace webapi.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public bool Archived { get; set; } = false;

        public Client? ClientId { get; set; } = null;

        public bool Favourite { get; set; } = false;

        public List<ProjectTask> TasksIds { get; set; } = new List<ProjectTask>();

        //public List<User> AccessUsers { get; set; }
    }
}
