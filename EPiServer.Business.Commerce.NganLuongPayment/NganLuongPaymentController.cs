using EPiServer.Commerce.Order;
using EPiServer.Core;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Web.Mvc;
using EPiServer.Web.Routing;
using Mediachase.Commerce.Orders;
using Mediachase.Commerce.Security;
using System.Linq;
using System.Web.Mvc;

namespace EPiServer.Business.Commerce.NganLuongPayment
{
    public class NganLuongPaymentController : PageController<NganLuongPage>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IContentLoader _contentLoader;
        private readonly UrlResolver _urlResolver;

        public NganLuongPaymentController() : this(ServiceLocator.Current.GetInstance<IOrderRepository>(),
            ServiceLocator.Current.GetInstance<IContentLoader>(),
            ServiceLocator.Current.GetInstance<UrlResolver>())
        { }

        public NganLuongPaymentController(IOrderRepository orderRepository, IContentLoader contentLoader, UrlResolver urlResolver)
        {
            _orderRepository = orderRepository;
            _contentLoader = contentLoader;
            _urlResolver = urlResolver;
        }

        public ActionResult Index()
        {
            if (Request.QueryString.Count == 0)
            {
                // cancel order
                var cancelUrl = GetUrlFromStartPageReferenceProperty("CheckoutPage"); // get link to Checkout page
                return Redirect(cancelUrl);
            }

            var cart = _orderRepository.LoadCart<ICart>(PrincipalInfo.CurrentPrincipal.GetContactId(), Cart.DefaultName);
            var payment = cart.GetFirstForm().Payments.First();
            var purchaseOrder = MakePurchaseOrder(cart, payment, Request.QueryString["order_code"]);

            // redirect to Order Confirmation page
            var redirectUrl = "http://vnexpress.net";

            return Redirect(redirectUrl);
        }

        private IPurchaseOrder MakePurchaseOrder(ICart cart, IPayment payment, string orderNumber)
        {
            var orderReference = _orderRepository.SaveAsPurchaseOrder(cart);
            var purchaseOrder = _orderRepository.Load<IPurchaseOrder>(orderReference.OrderGroupId);
            purchaseOrder.OrderNumber = orderNumber;

            // Remove old cart
            _orderRepository.Delete(cart.OrderLink);

            purchaseOrder.OrderStatus = OrderStatus.InProgress;
            _orderRepository.Save(purchaseOrder);

            return purchaseOrder;
        }

        /// <summary>
        /// Gets url from start page's page reference property.
        /// </summary>
        /// <param name="propertyName">The property name.</param>
        /// <returns>The friendly url.</returns>
        private string GetUrlFromStartPageReferenceProperty(string propertyName)
        {
            var startPageData = _contentLoader.Get<PageData>(ContentReference.StartPage);
            if (startPageData == null)
            {
                return _urlResolver.GetUrl(ContentReference.StartPage);
            }

            var contentLink = startPageData.Property[propertyName]?.Value as ContentReference;
            if (!ContentReference.IsNullOrEmpty(contentLink))
            {
                return _urlResolver.GetUrl(contentLink);
            }
            return _urlResolver.GetUrl(ContentReference.StartPage);
        }
    }
}
