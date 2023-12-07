namespace webapi.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public bool Done { get; set; } = false;

        //public List<User> AssignedUsers { get; set; }
    }
}
