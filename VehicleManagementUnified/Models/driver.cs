using System.Collections.Generic;

namespace VehicleManagementUnified.Models
{
    public class Driver
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LicenseNumber { get; set; }

       
        //public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
