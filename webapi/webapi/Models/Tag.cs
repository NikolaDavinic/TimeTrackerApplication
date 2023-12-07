namespace webapi.Models
{
    public class Tag
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public bool Archived { get; set; } = false;
    }
}
