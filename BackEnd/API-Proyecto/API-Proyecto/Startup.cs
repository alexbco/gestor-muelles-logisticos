using API_Proyecto.Dtos;
using API_Proyecto.Models;
using API_Proyecto.Services.Controllers;
using API_Proyecto.Services.Interfaces;
using API_Proyecto.Utils;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using static API_Proyecto.Dtos.UsuariosPerfilesDTO;

namespace API_Proyecto
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Este método se llama por el runtime de ASP.NET Core para agregar servicios a la aplicación.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(); // Agrega controladores para manejar solicitudes HTTP
            services.AddSwaggerGen(); // Agrega soporte para Swagger
            services.AddDbContext<AplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //});

            services.AddAutoMapper(typeof(AutoMapperProfiles));

            services.AddScoped<IUsuariosControllerService, UsuariosControllerService>();

        }

        // Este método se llama por el runtime de ASP.NET Core para configurar el pipeline de la aplicación.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Muestra páginas de excepciones en el entorno de desarrollo
                app.UseSwagger(); // Habilita Swagger en el entorno de desarrollo
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API v1")); // Configura la página de Swagger
            }

            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting(); // Configura el enrutamiento

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // Configura los controladores
            });
        }
    }
}
