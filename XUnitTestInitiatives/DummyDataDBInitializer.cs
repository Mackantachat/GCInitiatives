using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTestInitiatives
{
    public class DummyDataDBInitializer
    {
        public DummyDataDBInitializer()
        {
        }

        public void Seed(DataContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.Initiatives.AddRange(
                new Initiative() { Name = "A1", CreatedDate = DateTime.Now },
                new Initiative() { Name = "A2", CreatedDate = DateTime.Now },
                new Initiative() { Name = "A3", CreatedDate = DateTime.Now }
            );

            context.SaveChanges();

        }

    }
}
