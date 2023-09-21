// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using VehicleManagementUnified.Models;

namespace VehicleManagementUnified.Areas.Identity.Pages.Account.Manage
{
    public class ManageUserRolesModel : PageModel
    {
        public List<ApplicationUser> Users { get; set; }

        public ApplicationUser currentUser;
        
        //public Dictionary<string, IList<string>> user2Roles { get; set; } = new Dictionary<string, IList<string>>();

        public readonly UserManager<ApplicationUser> userManager;
        private readonly ILogger<PersonalDataModel> _logger;

        public string accessToken;

        [BindProperty]
        public string SelectedUserId { get; set; }

        [BindProperty]
        public string SelectedRole { get; set;  }

        public bool successfulPOST = false;

        public ManageUserRolesModel(
            UserManager<ApplicationUser> userManager,
            ILogger<PersonalDataModel> logger)
        {
            this.userManager = userManager;
            _logger = logger;
        }

        public async Task<IActionResult> OnGet()
        {
            this.currentUser = await userManager.GetUserAsync(User);
            if (this.currentUser == null)
            {
                return NotFound($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            } else if(!(await userManager.IsInRoleAsync(this.currentUser, "Administrator")))
            {
                return Unauthorized();
            }

            // Get the list of users
            Users = await userManager.Users
                //.Where(u => u.Id != _userManager.GetUserId(User))
                .ToListAsync();

            //foreach(var currUser in Users)
            //{
            //    this.user2Roles.Add(currUser.Id, await userManager.GetRolesAsync(currUser));
            //}

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            // Handle the form submission and update SelectedUserId if needed
            // For example, you can use Request.Form["SelectedUserId"] to access the selected value

            // Your logic here
            this.currentUser = await userManager.GetUserAsync(User);
            if (this.currentUser == null)
            {
                return NotFound($"Unable to load user with ID '{userManager.GetUserId(User)}'.");
            } else if (!(await userManager.IsInRoleAsync(this.currentUser, SharedData.ADMINISTRATOR_ROLE)))
            {
                return Unauthorized();
            }

            // Get the list of users
            Users = await userManager.Users
                //.Where(u => u.Id != _userManager.GetUserId(User))
                .ToListAsync();

            //foreach (var currUser in Users)
            //{
            //    this.user2Roles.Add(currUser.Id, await userManager.GetRolesAsync(currUser));
            //}

            var targetUser = await this.userManager.FindByIdAsync(this.SelectedUserId);
            if (await userManager.IsInRoleAsync(this.currentUser, SharedData.ADMINISTRATOR_ROLE) && !(await userManager.IsInRoleAsync(targetUser, SharedData.ADMINISTRATOR_ROLE)))
            {
                if(targetUser is null)
                {
                    return base.NotFound();
                }

                var currentUserRoles = await userManager.GetRolesAsync(targetUser);
                await userManager.RemoveFromRolesAsync(targetUser, currentUserRoles);
                await userManager.AddToRoleAsync(targetUser, this.SelectedRole);
            } else
            {
                return base.Unauthorized(); 
            }

            this.successfulPOST = true;

            return Page();
        }
    }
}
