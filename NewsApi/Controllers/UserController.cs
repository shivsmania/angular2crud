using NewsApi.EF;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Description;

namespace NewsApi.Controllers
{
    public class UserController : ApiController
    {
        NewsDBEntities db = new NewsDBEntities();
        string filename = "";
        // GET: api/User
        public IEnumerable<TableUser> GetUsers()
        {
            return db.TableUsers.OrderByDescending(u => u.UserId).ToList();
        }

        // GET: api/User/5        
        public TableUser GetUserById(int id)
        {
            return db.TableUsers.Where(u => u.UserId == id).FirstOrDefault();
        }

        // POST: api/User
        [HttpPost]
        public async Task<string> PostUser()
        {

            if (!Request.Content.IsMimeMultipartContent())
            {
                return "Invalid Form Input";
            }
            Dictionary<string, string> formList = new Dictionary<string, string>();
            string root = HttpContext.Current.Server.MapPath("~/Uploads");
            var provider = new MultipartFormDataStreamProvider(root);
            TableUser userObj = new TableUser();
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach (MultipartFileData file in provider.FileData)
                {
                    filename = file.Headers.ContentDisposition.FileName;
                    if (filename.StartsWith("\"") && filename.EndsWith("\""))
                    {
                        filename = filename.Trim('"');
                    }
                    if (filename.Contains(@"/") || filename.Contains(@"\"))
                    {
                        filename = Path.GetFileName(filename);
                    }
                    filename = Guid.NewGuid() + filename;
                    File.Move(file.LocalFileName, Path.Combine(root, filename));
                }
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        formList.Add(key, val);
                    }
                }
                userObj.FullName = formList["FullName"];
                userObj.Username = formList["Username"];
                userObj.Email = formList["Email"];
                userObj.Password = Crypto.Hash(formList["Password"]);
                userObj.Address = formList["Address"];
                userObj.Mobile = formList["Mobile"];
                userObj.isActive = true;
                userObj.DisplayPic = filename;
                db.TableUsers.Add(userObj);
                db.SaveChanges();
                return "Ok";
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        [Route("api/User/login")]
        [HttpPost]
        [ResponseType(typeof(TableUser))]
        public TableUser ValidateUser([FromBody]TableUser userObj)
        {
            try
            {
                string encpass = Crypto.Hash(userObj.Password);
                TableUser tu = db.TableUsers.Where(u => u.Username.Contains(userObj.Username) && u.Password.Contains(encpass)).FirstOrDefault();
                return tu;
            }
            catch (Exception cc)
            {
                throw cc;
            }
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }


        //[HttpPost]
        //[Route("api/UploadPhoto")]
        //public string UploadPhoto()
        //{
        //    var httpRequest = HttpContext.Current.Request;
        //    var files = httpRequest.Files;
        //    if (files.Count > 0)
        //    {
        //        //HttpPostedFileBase file = files[0]; 
        //        filename = files[0].FileName;
        //        string path = "~/Uploads/" + Guid.NewGuid() + filename;
        //        files[0].SaveAs(HttpContext.Current.Server.MapPath(path));

        //        return "Profile photo uploaded";
        //    }
        //    else
        //    {
        //        return "Upload profile image";
        //    }
        //}
    }
}
