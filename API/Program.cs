using System.Runtime.CompilerServices;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
{
    IConfiguration configuration = builder.Configuration;
    options.UseSqlite(configuration.GetConnectionString("ConnectionStrings"));
});


builder.Services.AddCors();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseRouting();
    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
    
    app.UseAuthentication();
    // app.UseSwagger();
    // app.UseSwaggerUI();
    
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

