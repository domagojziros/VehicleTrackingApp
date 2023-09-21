using Microsoft.AspNetCore.Identity;

namespace VehicleManagementUnified.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public string? Name { get; set; }

        [PersonalData]
        public DateTime? DOB { get; set; }

        // Add roles property
        //public virtual IList<IdentityUserRole<string>> Roles { get; set; }
    }
}