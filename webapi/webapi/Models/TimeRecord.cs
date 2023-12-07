namespace webapi.Models
{
    public class TimeRecord
    {
        public int Id { get; set; }

        public Project? Project { get; set; } = null;

        public DateTime DateOfRecord { get; set; }

        public Tag? Tag { get; set; } = null;

        public int TimeOfRecord { get; set; }
    }
}
