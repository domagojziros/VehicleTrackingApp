namespace VehicleManagementUnified.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        public int ProductionYear { get; set; }
        public double MaxLoadCapacity { get; set; }

 
        public double LocationX { get; set; }
        public double LocationY { get; set; }

        public int DriverId { get; set; }

        public virtual Driver Driver { get; set; }

        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
    }
}
