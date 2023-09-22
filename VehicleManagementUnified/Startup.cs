using Duende.IdentityServer.AspNetIdentity;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using VehicleManagementUnified.Data;
using VehicleManagementUnified.Models;
using VehicleManagementUnified.Services;

namespace VehicleManagementUnified
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("AzureSQLConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseSqlServer(connectionString);
                options.UseLazyLoadingProxies();
            });

            services.AddDatabaseDeveloperPageExceptionFilter();

            // Default identity
            services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddRoles<IdentityRole>() // Add this line to enable roles
                .AddEntityFrameworkStores<ApplicationDbContext>();

            // Configure IdentityServer
            // Read IdentityServer configuration from appsettings.json
            IConfiguration identityServerConfig = Configuration.GetSection("IdentityServer");
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>()
                .AddProfileService<ProfileService>()
                ;

            // JWT
            services.AddAuthentication()
                .AddIdentityServerJwt()
                 ;

            services.AddAuthorization(options => {
                options.AddPolicy("AuthorizedUser", policy =>
                {

                    policy.RequireClaim(ClaimTypes.Role, "Administrator", "VerifiedUser"); //  this work
                });
            });

            services.AddAntiforgery(
                options =>
                {
                    options.HeaderName = "X-XSRF-TOKEN";
                    options.SuppressXFrameOptionsHeader = true;
                });

            services.AddControllersWithViews();
            services.AddRazorPages();

            services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;
            }
            );
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddMvcCore().AddApiExplorer();

            services.AddSwaggerGen();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    builder => builder.WithOrigins("https://localhost:44470", "https://vehiclemanagementunified.azurewebsites.net/")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()         // This is important for sending cookies;
                    );
            });

            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromMinutes(10);
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // Configure cookie properties
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
                options.Secure = CookieSecurePolicy.Always;
                options.HttpOnly = HttpOnlyPolicy.None;
            });
        }

        private async Task CreateRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(SharedData.ADMINISTRATOR_ROLE))
            {
                await roleManager.CreateAsync(new IdentityRole(SharedData.ADMINISTRATOR_ROLE));
            }

            if (!await roleManager.RoleExistsAsync(SharedData.BASIC_USER_ROLE))
            {
                await roleManager.CreateAsync(new IdentityRole(SharedData.BASIC_USER_ROLE));
            }

            if (!await roleManager.RoleExistsAsync(SharedData.VERIFIED_USER_ROLE))
            {
                await roleManager.CreateAsync(new IdentityRole(SharedData.VERIFIED_USER_ROLE));
            }
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            CreateRoles(roleManager).GetAwaiter().GetResult();

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vehicle Management API");
                });

                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.None,
                HttpOnly = HttpOnlyPolicy.None, // Optional: Set HttpOnly policy
                Secure = CookieSecurePolicy.Always, // Optional: Set Secure policy (requires HTTPS)
                CheckConsentNeeded = context => false
            });

            app.UseCors("AllowFrontend");

            // Used for debugging
            app.Use(async (context, next) => {
                await next();

                string authHeader = context.Request.Headers["Authorization"];
                if (authHeader != null /* && authHeader.StartsWith("Bearer ") */)
                {
                    string token = authHeader.Substring("Bearer ".Length).Trim();
                }
            });

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapFallbackToFile("index.html");
            });

            //SharedData.SeedData(applicationDbContext, userManager).GetAwaiter().GetResult();
        }
    }
}
