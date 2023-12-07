﻿namespace webapi.Models
{
    public class Client
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string? Address { get; set; } = string.Empty;

        public string? Note { get; set; } = string.Empty;

        public bool Archived { get; set; } = false;
    }
}