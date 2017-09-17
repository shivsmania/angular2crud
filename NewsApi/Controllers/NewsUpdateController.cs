using NewsApi.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NewsApi.Controllers
{
    public class NewsUpdateController : ApiController
    {
        NewsDBEntities db = new NewsDBEntities();
        // GET: api/NewsUpdate
        public IEnumerable<TableNewsUpdate> GetAllNews()
        {
            return db.TableNewsUpdates.OrderByDescending(n => n.PostedDate).ToList();
        }

        [Route("api/NewsUpdate/FeaturedNews")]
        public IEnumerable<TableNewsUpdate> GetFeaturedNews()
        {
            return db.TableNewsUpdates.Take(5).OrderByDescending(n => n.PostedDate).ToList();
        }

        // GET: api/NewsUpdate/5
        public TableNewsUpdate GetNewsById(int id)
        {
            return db.TableNewsUpdates.Where(n=>n.NewsId == id).FirstOrDefault();
        }

        [Route("api/NewsUpdate/NewsByUserId/{id}")]
        public IEnumerable<TableNewsUpdate> GetNewsByUserId(int id)
        {
            return db.TableNewsUpdates.Where(n => n.UserId == id).ToList();
        }

        // POST: api/NewsUpdate
        public string PostNews([FromBody]TableNewsUpdate newsObj)
        {
            try
            {
                TableNewsUpdate tn = new TableNewsUpdate();
                tn.Title = newsObj.Title;
                tn.Exerpt = newsObj.Exerpt;
                tn.Source = newsObj.Source;
                tn.Category = newsObj.Category;
                tn.Region = newsObj.Region;
                tn.PostedDate = DateTime.Now;
                tn.isActive = true;
                tn.UserId = newsObj.UserId;
                db.TableNewsUpdates.Add(tn);
                db.SaveChanges();
                return "Ok";

            }
            catch (Exception ee)
            {
                throw ee;
            }
        }

        // PUT: api/NewsUpdate/5
        public string PutNews(int id, [FromBody]TableNewsUpdate newsObj)
        {
            try
            {
                TableNewsUpdate tn = new TableNewsUpdate();
                tn.Title = newsObj.Title;
                tn.Exerpt = newsObj.Exerpt;
                tn.Source = newsObj.Source;
                tn.Category = newsObj.Category;
                tn.Region = newsObj.Region;
                tn.PostedDate = newsObj.PostedDate;
                tn.isActive = newsObj.isActive;
                tn.UserId = newsObj.UserId;
                db.Entry(newsObj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return "Ok";
            }
            catch (Exception)
            {
                throw;
            }
        }

        // DELETE: api/NewsUpdate/5
        public string DeleteNews(int id)
        {
            try
            {
                db.TableNewsUpdates.Remove(db.TableNewsUpdates.Find(id));
                db.SaveChanges();
                return "Ok";
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
