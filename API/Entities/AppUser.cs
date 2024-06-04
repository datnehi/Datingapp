
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {

        public DateTime DateOfBirth { set; get; }

        public string? KnownAs { get; set; }

        public DateTime? Created { get; set; } = DateTime.Now;

        public DateTime? LastActive { get; set; } = DateTime.Now;

        public string? Gender { set; get; }

        public string? Introduction { set; get; }

        public string? LookingFor { set; get; }

        public string? Interests { get; set; }

        public string? City { get; set; }

        public string? Country { set; get; }

        public ICollection<Photo> Photos { set; get; }
        public ICollection<UserLike> LikedByUsers { set; get; }
        public ICollection<UserLike> LikedUsers { set; get; }
        public ICollection<Message> MessagesSent { set; get; }
        public ICollection<Message> MessagesReceived { set; get; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}