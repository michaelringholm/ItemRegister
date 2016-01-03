using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ItemRegisterWeb.Models
{
    public class MyBikesModel
    {
        public MyBikesModel()
        {
            Bikes = new List<DAL.item>();
        }

        public MyBikesModel(String userKey)
        {
            Bikes = new DAL.DataClassesDataContext().items.Where(b => b.user_key == userKey).ToList();
        }

        public List<DAL.item> Bikes { get; set; }

    }
}
