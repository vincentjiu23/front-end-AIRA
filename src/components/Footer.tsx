const Footer = () => (
  <footer
    className="relative w-full text-white px-6 md:px-12 py-12"
    style={{ backgroundColor: "#152e66" }}
  >
    {/* Konten Footer */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
      {/* Helpdesk */}
      <div>
        <h3 className="font-bold text-lg mb-3">Helpdesk</h3>
        <p className="hover:underline cursor-pointer">
          Gedung A, Lantai 5 ruang <br />
          Jl. Scientia Boulevard, Gading Serpong <br />
          Tangerang, Banten 15811
        </p>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-bold text-lg mb-3">Contact</h3>
        <p>
          <span className="font-semibold">Phone</span><br />
          <span className="hover:underline cursor-pointer">(021) 1234 567 ext.3518</span>
        </p>
        <p className="mt-2">
          <span className="font-semibold">Email</span><br />
          <span className="hover:underline cursor-pointer">AIRA@umn.ac.id</span>
        </p>
        <p className="mt-2 hover:underline cursor-pointer">
          Whatsapp (Message Only): 0822-1234-5678
        </p>
      </div>

      {/* More */}
      <div>
        <h3 className="font-bold text-lg mb-3">More</h3>
        <p className="hover:underline cursor-pointer">Lorem ipsum</p>
      </div>
    </div>

    {/* Background Cityscape */}
    <div className="absolute bottom-0 left-0 w-full">
      <img
        src="/assets/footer-city.png" // ganti dengan path ilustrasi kota kamu
        alt="Cityscape"
        className="w-full object-cover"
      />
    </div>
  </footer>
)

export default Footer

