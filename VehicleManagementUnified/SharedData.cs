using Microsoft.AspNetCore.Identity;
using System;
using VehicleManagementUnified.Data;
using VehicleManagementUnified.Models;

namespace VehicleManagementUnified
{
    public static class SharedData
    {
        public const string ADMINISTRATOR_ROLE = "Administrator";
        public const string BASIC_USER_ROLE = "BasicUser";
        public const string VERIFIED_USER_ROLE = "VerifiedUser";

        public static async Task SeedData(ApplicationDbContext dbContext, UserManager<ApplicationUser> _userManager)
        {
            dbContext.Locations.RemoveRange(dbContext.Locations);
            dbContext.Vehicles.RemoveRange(dbContext.Vehicles);
            dbContext.Drivers.RemoveRange(dbContext.Drivers);
            //dbContext.Users.RemoveRange(dbContext.Users);
            dbContext.SaveChanges();

            //var adminUser = new ApplicationUser { UserName = "Admin", Email = "admin@gmail.com" };
            //var result = await _userManager.CreateAsync(adminUser, "Admin123!");
            //if (result.Succeeded)
            //{
            //    // Set EmailConfirmed to true
            //    adminUser.EmailConfirmed = true;

            //    // Set Lockout to false and reset access failed count
            //    adminUser.LockoutEnabled = false;
            //    adminUser.LockoutEnd = null; // Reset lockout end date
            //    await _userManager.UpdateAsync(adminUser); // Update user in the database

            //    //await _userManager.AddToRoleAsync(adminUser, "Administrator");
            //}
            //await dbContext.SaveChangesAsync();

            var drivers = new List<Driver>
            {
                new Driver
                {
                    Name = "Ivan Ivanovic",
                    LicenseNumber = "123",
                },
                new Driver
                {
                    Name = "Marko Markic",
                    LicenseNumber = "321",
                }
            };
            dbContext.Drivers.AddRange(drivers);

            var locations = new List<Location>
            {
                new Location
                {
                    Name = "Skladište 1",
                    Address = "Ulica lipa 23",
                    LocationX = 15.966568,
                    LocationY = 45.815399,
                    Time = DateTime.Now

                },
                new Location
                {
                    Name = "Centralno Skladište",
                    Address = "Ulica brijestova 32",
                    LocationX = 18.6939,
                    LocationY = 45.5511,
                    Time = DateTime.Now
                }
            };
            dbContext.Locations.AddRange(locations);

            var vehicles = new List<Vehicle>
            {
                new Vehicle
                {
                    Model = "Renault",
                    RegistrationNumber = "VK111AA",
                    ProductionYear = 2022,
                    MaxLoadCapacity = 1000.0,
                    LocationX = 15.966568,
                    LocationY = 45.815399,
                    Driver = drivers[0],
                    Location= locations[0]
                },
                new Vehicle
                {
                    Model = "Opel",
                    RegistrationNumber = "VU222AB",
                    ProductionYear = 2021,
                    MaxLoadCapacity = 5000.0,
                    LocationX = 18.6939,
                    LocationY = 45.5511,
                    Driver = drivers[1],
                    Location= locations[1]
                }
            };
            dbContext.Vehicles.AddRange(vehicles);
            await dbContext.SaveChangesAsync();
        }

    }
}