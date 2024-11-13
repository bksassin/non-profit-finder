export function ListYourNonprofit() {
  return (
    <div className="mt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with enhanced styling */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
            <div className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-100 to-emerald-200 opacity-30"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
            For Nonprofits
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Join these leading platforms to increase your visibility, build trust, and reach more donors
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Givebutter Card */}
          <a 
            href="https://givebutter.com/signup"
            target="_blank"
            rel="noopener noreferrer" 
            className="group relative bg-white rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                Join Givebutter
              </h3>
              <p className="text-gray-500 mb-4">Modern fundraising platform with zero platform fees, live donor feed, and team fundraising tools</p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Learn More</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>

          {/* Every.org Card */}
          <a 
            href="https://www.every.org/nonprofits"
            target="_blank"
            rel="noopener noreferrer" 
            className="group relative bg-white rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                Join Every.org
              </h3>
              <p className="text-gray-500 mb-4">Free donation processing with automatic tax receipts and donor-advised fund acceptance</p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Learn More</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>

          {/* GlobalGiving Card */}
          <a 
            href="https://www.globalgiving.org/dy/v2/pe/application/start.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                Join GlobalGiving
              </h3>
              <p className="text-gray-500 mb-4">Access global grants, corporate partnerships, and disaster relief funding opportunities</p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Learn More</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>

          {/* Charity Navigator Card */}
          <a 
            href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1223"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                Join Charity Navigator
              </h3>
              <p className="text-gray-500 mb-4">Get evaluated and increase donor trust through America's largest charity evaluator</p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Learn More</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}