import { TreeDeciduous, AlertTriangle, DollarSign, HelpCircle, Bug, Wrench } from 'lucide-react'



export function Home({ setScreen }) {
  const tools = [
    {
      id: 'species',
      icon: TreeDeciduous,
      title: 'Species Identifier',
      description: 'Identify your tree species and learn about its care needs',
      color: 'from-green-600 to-emerald-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700'
    },
    {
      id: 'hazard',
      icon: AlertTriangle,
      title: 'Hazard Assessment',
      description: 'Check if your tree poses a safety risk to your property',
      color: 'from-orange-600 to-red-700',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700'
    },
    {
      id: 'ailments',
      icon: Bug,
      title: 'Common Problems',
      description: 'Diagnose diseases, pests, and other tree health issues',
      color: 'from-purple-600 to-pink-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700'
    },
    {
      id: 'diy',
      icon: Wrench,
      title: 'DIY vs Professional',
      description: 'Learn what you can do yourself and when to call a pro',
      color: 'from-blue-600 to-cyan-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700'
    },
    {
      id: 'cost',
      icon: DollarSign,
      title: 'Cost Estimator',
      description: 'Get typical price ranges for common tree services',
      color: 'from-yellow-600 to-amber-700',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-700'
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Expert Advice',
      description: 'General tree care tips and seasonal maintenance guides',
      color: 'from-teal-600 to-green-700',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-slate-100 dark:text-emerald-400 mb-4 transition-colors duration-300">
          Your Free Tree Care Assistant
        </h2>
        <p className="text-xl text-amber-800 dark:text-slate-300 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
          Professional arborist knowledge at your fingertips. Identify problems, 
          assess risks, and make informed decisions about your trees.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <button
            key={tool.id}
            onClick={() => setScreen(tool.id)}
            className="group relative bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideUp 0.6s ease-out forwards'
            }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative p-6">
              <div className={`${tool.iconBg} dark:bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className={`w-8 h-8 ${tool.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-amber-900 dark:text-slate-100 dark:text-slate-100 mb-2 group-hover:text-amber-800 dark:text-slate-300 dark:group-hover:text-emerald-400 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-amber-700 dark:text-slate-400 dark:text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-4 right-4 text-amber-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="mt-16 bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 transition-colors duration-300">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-amber-900 dark:text-slate-100 dark:text-emerald-400 mb-4 transition-colors duration-300">
            Why We Created This Tool
          </h3>
          <p className="text-lg text-amber-800 dark:text-slate-300 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            At Midwest Roots Tree Services, we believe in educating homeowners. 
            When you understand your trees, you make better decisions for your property and your budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TreeDeciduous className="w-8 h-8 text-green-700 dark:text-emerald-400" />
            </div>
            <h4 className="font-bold text-amber-900 dark:text-slate-100 dark:text-slate-200 mb-2">Expert Knowledge</h4>
            <p className="text-sm text-amber-700 dark:text-slate-400 dark:text-slate-400">
              Professional arborist insights, simplified for homeowners
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-blue-700 dark:text-blue-400" />
            </div>
            <h4 className="font-bold text-amber-900 dark:text-slate-100 dark:text-slate-200 mb-2">No Pressure</h4>
            <p className="text-sm text-amber-700 dark:text-slate-400 dark:text-slate-400">
              Use our tools without any obligation or sales pitch
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-yellow-700 dark:text-yellow-400" />
            </div>
            <h4 className="font-bold text-amber-900 dark:text-slate-100 dark:text-slate-200 mb-2">Save Money</h4>
            <p className="text-sm text-amber-700 dark:text-slate-400 dark:text-slate-400">
              Learn what you can DIY and when to call the pros
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
