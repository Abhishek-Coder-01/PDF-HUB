function Work() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 px-4 overflow-hidden"
    >


      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-20 fade-in" data-aos="fade-up" data-aos-offset="200" data-aos-duration="900">
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full mb-6 shadow-sm">

            <i className="fas fa-cog text-indigo-600 mr-2 text-xs sm:text-sm"></i>
            <span className="text-gray-700 font-semibold text-sm tracking-wide">How to work</span>
          </div>

          <h2
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight dark:text-white"
         
          >
            How to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Works
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
            Experience the most advanced plant identification technology with features designed for botanists, gardeners, and nature enthusiasts worldwide.
          </p>
        </div>

        {/* Steps Grid with Modern Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">

          {/* Step 1 - Select Operation */}
          <div className="group relative">
            {/* Glow layer */}
            <div className="
    absolute inset-0
    bg-white/80 dark:bg-white/5
    backdrop-blur-sm
    rounded-3xl
    opacity-25 group-hover:opacity-50
    transition duration-300
  "></div>

            <div className="
    relative rounded-3xl p-8 overflow-hidden fade-in
    bg-white/80 dark:bg-gray-900/70
    backdrop-blur-sm

    border-2 border-gray-200/50 dark:border-gray-700/50
    hover:border-indigo-400 dark:hover:border-indigo-500

    hover:shadow-2xl
    hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20

    transition-all duration-500
    transform hover:-translate-y-3 hover:scale-100
  ">
              {/* Step Number Badge */}
              <div className="
      absolute -top-4 -right-4 w-16 h-16
      bg-gradient-to-br from-yellow-400 to-orange-500
      rounded-2xl shadow-xl
      flex items-center justify-center
      transform rotate-12 group-hover:rotate-0
      transition-transform duration-300
    ">
                <span className="font-black text-white text-2xl">01</span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="
        w-20 h-20 rounded-2xl
        bg-gradient-to-br from-purple-500 to-indigo-600
        flex items-center justify-center
        shadow-2xl
        transform group-hover:scale-110
        transition-transform duration-300
      ">
                  <i className="fas fa-tasks text-white text-3xl"></i>
                </div>
              </div>

              {/* Content */}
              <h3 className="
      text-2xl font-bold mb-4
      text-gray-800 dark:text-gray-100
    ">
                Select an Operation
              </h3>

              <p className="
      leading-relaxed mb-6
      text-gray-600/70 dark:text-gray-400
    ">
                Choose the PDF operation according to your needs.
              </p>

              {/* Operation Icons */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "fa-lock", color: "purple", label: "Lock PDF" },
                  { icon: "fa-unlock", color: "green", label: "Unlock PDF" },
                  { icon: "fa-object-group", color: "blue", label: "Merge PDF" },
                  { icon: "fa-image", color: "pink", label: "Image to PDF" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="
            rounded-lg p-3 shadow-sm
            bg-white/90 dark:bg-gray-800/70
            border border-gray-200 dark:border-gray-700
            hover:bg-white dark:hover:bg-gray-800
            transition-colors
          "
                  >
                    <i className={`fas ${item.icon} text-${item.color}-500 mb-2`}></i>
                    <p className="
            text-xs font-medium
            text-gray-700 dark:text-gray-300
          ">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Step 2 - Processing */}
          <div className="group relative">
            {/* Glow / glass layer */}
            <div className="
    absolute inset-0
    bg-white/80 dark:bg-white/5
    backdrop-blur-sm
    rounded-3xl
    opacity-25 group-hover:opacity-50
    transition duration-300
  "></div>

            <div className="
    relative rounded-3xl p-8 overflow-hidden fade-in
    bg-white/80 dark:bg-gray-900/70
    backdrop-blur-sm

    border-2 border-gray-200/50 dark:border-gray-700/50
    hover:border-indigo-400 dark:hover:border-indigo-500

    hover:shadow-2xl
    hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20

    transition-all duration-500
    transform hover:-translate-y-3 hover:scale-100
  ">
              {/* Step Number Badge */}
              <div className="
      absolute -top-4 -right-4 w-16 h-16
      bg-gradient-to-br from-yellow-400 to-orange-500
      rounded-2xl shadow-xl
      flex items-center justify-center
      transform rotate-12 group-hover:rotate-0
      transition-transform duration-300
    ">
                <span className="font-black text-white text-2xl">02</span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="
        w-20 h-20 rounded-2xl
        bg-gradient-to-br from-blue-500 to-cyan-600
        flex items-center justify-center
        shadow-2xl
        transform group-hover:scale-110
        transition-transform duration-300
      ">
                  <i className="fas fa-cog text-white text-3xl"></i>
                </div>
              </div>

              {/* Content */}
              <h3 className="
      text-2xl font-bold mb-4
      text-gray-800 dark:text-gray-100
    ">
                PDF Processing
              </h3>

              <p className="
      leading-relaxed mb-6
      text-gray-600/70 dark:text-gray-400
    ">
                Our system processes your PDF instantly and efficiently.
              </p>

              {/* Feature list */}
              <div className="grid grid-cols-1 gap-3">
                <div className="
        rounded-lg p-3 shadow-sm
        bg-white/90 dark:bg-gray-800/70
        border border-gray-200 dark:border-gray-700
        hover:bg-white dark:hover:bg-gray-800
        transition-colors
      ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-bolt text-yellow-500"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lightning Fast Speed
                    </p>
                  </div>
                </div>

                <div className="
        rounded-lg p-3 shadow-sm
        bg-white/90 dark:bg-gray-800/70
        border border-gray-200 dark:border-gray-700
        hover:bg-white dark:hover:bg-gray-800
        transition-colors
      ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-star text-blue-500"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      High Quality Output
                    </p>
                  </div>
                </div>

                <div className="
        rounded-lg p-3 shadow-sm
        bg-white/90 dark:bg-gray-800/70
        border border-gray-200 dark:border-gray-700
        hover:bg-white dark:hover:bg-gray-800
        transition-colors
      ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-shield-alt text-green-500"></i>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Secure Processing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Step 3 - Download */}
          <div className="group relative h-full">
            {/* Glass glow layer */}
            <div className="
    absolute inset-0
    bg-white/80 dark:bg-white/5
    backdrop-blur-sm
    rounded-3xl
    opacity-25 group-hover:opacity-50
    transition duration-300
  "></div>

            <div className="
    relative h-full flex flex-col
    rounded-3xl p-8 overflow-hidden fade-in
    bg-white/80 dark:bg-gray-900/70
    backdrop-blur-sm

    border-2 border-gray-200/50 dark:border-gray-700/50
    hover:border-pink-400 dark:hover:border-pink-500

    hover:shadow-2xl
    hover:shadow-pink-500/10 dark:hover:shadow-pink-500/20

    transition-all duration-500
    transform hover:-translate-y-3 hover:scale-100
  ">
              {/* Step Number Badge */}
              <div className="
      absolute -top-4 -right-4 w-16 h-16
      bg-gradient-to-br from-yellow-400 to-orange-500
      rounded-2xl shadow-xl
      flex items-center justify-center
      transform rotate-12 group-hover:rotate-0
      transition-transform duration-300
    ">
                <span className="font-black text-white text-2xl">03</span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="
        w-20 h-20 rounded-2xl
        bg-gradient-to-br from-pink-500 to-purple-600
        flex items-center justify-center
        shadow-2xl
        transform group-hover:scale-110
        transition-transform duration-300
      ">
                  <i className="fas fa-download text-white text-3xl"></i>
                </div>
              </div>

              {/* Content */}
              <h3 className="
      text-2xl font-bold mb-4
      text-gray-800 dark:text-gray-100
    ">
                Download PDF
              </h3>

              <p className="
      leading-relaxed mb-6
      text-gray-600/70 dark:text-gray-400
    ">
                Download your processed PDF file instantly.
              </p>

              {/* Download options grid */}
              <div className="grid grid-cols-2 gap-3 flex-grow">
                {[
                  { icon: "fa-download", color: "pink" },
                  { icon: "fa-cloud", color: "purple" },
                  { icon: "fa-envelope", color: "blue" },
                  { icon: "fa-share-alt", color: "green" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="
            rounded-lg p-3 shadow-sm
            flex items-center justify-center

            bg-white/90 dark:bg-gray-800/70
            border border-gray-200 dark:border-gray-700

            hover:bg-white dark:hover:bg-gray-800
            transition-colors
          "
                  >
                    <i className={`fas ${item.icon} text-${item.color}-500 text-xl`}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* Bonus Security Section */}
        <div className="relative" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
          {/* Glow layer */}
          <div className="
    absolute inset-0
    bg-white/80 dark:bg-white/5
    backdrop-blur-sm blur-xl
    rounded-3xl
    opacity-25
  "></div>

          <div className="
    relative max-w-4xl mx-auto p-8 rounded-3xl
    bg-white/80 dark:bg-gray-900/70
    backdrop-blur-sm

    border-2 border-gray-200/50 dark:border-gray-700/50
  ">
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Icon Side */}
              <div className="flex-shrink-0">
                <div className="
          w-24 h-24 rounded-3xl
          bg-gradient-to-br from-green-500 to-emerald-600
          flex items-center justify-center
          shadow-2xl
          transform hover:scale-110
          transition-transform duration-300
        ">
                  <i className="fas fa-shield-alt text-white text-4xl"></i>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 text-center md:text-left">
                <div className="
          inline-flex items-center gap-2
          px-4 py-2 mb-4 rounded-full
          bg-green-500/10 dark:bg-green-500/20
          border border-green-200 dark:border-green-400/30
        ">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="
            font-semibold text-sm
            text-green-700 dark:text-green-300
          ">
                    100% SECURE
                  </span>
                </div>

                <h3 className="
          text-3xl font-black mb-3
          text-gray-800 dark:text-gray-100
        ">
                  Bank-Level <span className="text-green-600 dark:text-green-400">Security</span>
                </h3>

                <p className="
          leading-relaxed
          text-gray-600/70 dark:text-gray-400
        ">
                  Aapki files ko process karne ke baad automatically delete kar diya jata hai.
                  256-bit encryption ke saath fully secure processing guarantee.
                </p>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-1 gap-3 min-w-[200px]">
                <div className="
          rounded-lg px-4 py-3 shadow-sm
          bg-white/90 dark:bg-gray-800/70
          border border-gray-200 dark:border-gray-700
          hover:bg-white dark:hover:bg-gray-800
          transition-colors
        ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-lock text-green-500"></i>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Encrypted
                    </span>
                  </div>
                </div>

                <div className="
          rounded-lg px-4 py-3 shadow-sm
          bg-white/90 dark:bg-gray-800/70
          border border-gray-200 dark:border-gray-700
          hover:bg-white dark:hover:bg-gray-800
          transition-colors
        ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-trash-alt text-red-500"></i>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Auto-Delete
                    </span>
                  </div>
                </div>

                <div className="
          rounded-lg px-4 py-3 shadow-sm
          bg-white/90 dark:bg-gray-800/70
          border border-gray-200 dark:border-gray-700
          hover:bg-white dark:hover:bg-gray-800
          transition-colors
        ">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-user-shield text-blue-500"></i>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Privacy First
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Work;
