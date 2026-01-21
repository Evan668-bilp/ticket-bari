const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold">TicketBari</h3>
          <p>Book bus, train, launch & flight tickets easily</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/all-tickets">All Tickets</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Contact Info</h4>
          <p>Email: info@ticketbari.com</p>
          <p>Phone: +880123456789</p>
          <p>Facebook: fb.com/ticketbari</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Payment Methods</h4>
          <p>Stripe</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t pt-4">© 2025 TicketBari. All rights reserved.</div>
    </footer>
  );
};

export default Footer;