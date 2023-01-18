using rottoApp.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("rottoAppDB"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("rottoAppDB"))));
builder.Services.AddCors();
builder.Services.AddSwaggerGen();

// Add services to the container.



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(options => options
                .AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());


app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
