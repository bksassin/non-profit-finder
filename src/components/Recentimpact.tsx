interface NonProfit {
    id: string;
    name: string;
    description?: string;
    coverImageUrl?: string;
    donationsCount?: number;
  }
  
  interface RecentImpactProps {
    nonprofits: NonProfit[];
  }
  
  export function RecentImpact({ nonprofits }: RecentImpactProps) {
    return (
      <div className="my-12">
        <h2 className="text-2xl font-bold text-center mb-6">Recent Impact</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {nonprofits.slice(0, 3).map(nonprofit => (
            <div key={nonprofit.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              {nonprofit.coverImageUrl && (
                <img 
                  src={nonprofit.coverImageUrl} 
                  alt={nonprofit.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{nonprofit.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {nonprofit.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {nonprofit.donationsCount || 0} donations
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }