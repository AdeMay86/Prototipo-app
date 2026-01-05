
import React, { useState, useMemo } from 'react';
import { DEFAULT_CONFIG } from './constants';
import { CabinetInput, Config, CostBreakdown, GaugeType, ChapaSize } from './types';
import { calculateCost } from './utils/calculations';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [input, setInput] = useState<CabinetInput>({
    height: 60,
    width: 40,
    depth: 25,
    gauge: GaugeType.G20,
    chapaType: ChapaSize.SMALL,
  });
  const [activeTab, setActiveTab] = useState<'calculator' | 'config' | 'indirects'>('calculator');

  const results = useMemo(() => calculateCost(input, config), [input, config]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: name === 'height' || name === 'width' || name === 'depth' ? Number(value) : value
    }));
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">ELECTROIMPORTADOS</h1>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Costeo de Gabinetes Industriales</p>
            </div>
          </div>
          
          <nav className="flex bg-slate-800 rounded-full p-1">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'calculator' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Calculadora
            </button>
            <button 
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'config' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Materiales
            </button>
            <button 
              onClick={() => setActiveTab('indirects')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'indirects' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Costos Fijos
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-1 space-y-6">
            {activeTab === 'calculator' && (
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">1</span>
                  Dimensiones del Gabinete
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
                    <input 
                      type="number" name="height" value={input.height} onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ancho (cm)</label>
                    <input 
                      type="number" name="width" value={input.width} onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Profundidad (cm)</label>
                    <input 
                      type="number" name="depth" value={input.depth} onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Calibre de Lámina</label>
                    <select 
                      name="gauge" value={input.gauge} onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                    >
                      <option value={GaugeType.G18}>Calibre 18 (Más grueso)</option>
                      <option value={GaugeType.G20}>Calibre 20</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Chapa</label>
                    <select 
                      name="chapaType" value={input.chapaType} onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                    >
                      <option value={ChapaSize.SMALL}>Chapa Pequeña</option>
                      <option value={ChapaSize.LARGE}>Chapa Grande</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'config' && (
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">2</span>
                  Precios de Materiales
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Precio Lámina C18 (Full)', name: 'laminaPriceG18' },
                    { label: 'Precio Lámina C20 (Full)', name: 'laminaPriceG20' },
                    { label: 'Pintura Polvo (Kg)', name: 'pinturaKgPrice' },
                    { label: 'Bisagra (Unidad)', name: 'bisagraUnitPrice' },
                    { label: 'Chapa Pequeña', name: 'chapaSmallPrice' },
                    { label: 'Chapa Grande', name: 'chapaLargePrice' },
                  ].map(item => (
                    <div key={item.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{item.label}</label>
                      <input 
                        type="number" name={item.name} value={(config as any)[item.name]} onChange={handleConfigChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'indirects' && (
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">3</span>
                  Costos Operativos
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Producción Mensual (Unidades)', name: 'monthlyProduction' },
                    { label: 'Arriendo Mensual', name: 'monthlyRent' },
                    { label: 'Nómina Mensual', name: 'monthlySalaries' },
                    { label: 'Servicios Públicos', name: 'monthlyUtilities' },
                    { label: 'Precio Pipeta Gas', name: 'gasPipetaPrice' },
                  ].map(item => (
                    <div key={item.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{item.label}</label>
                      <input 
                        type="number" name={item.name} value={(config as any)[item.name]} onChange={handleConfigChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Resumen de Costos</h2>
                <div className="text-right">
                  <span className="text-sm text-slate-500 uppercase font-semibold">Costo Total Fábrica</span>
                  <div className="text-3xl font-black text-orange-600">{formatCurrency(results.totalManufacturingCost)}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Detailed Breakdown */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Materia Prima e Insumos</h3>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Lámina Metálica ({input.gauge})</span>
                      <span className="font-medium">{formatCurrency(results.laminaCost)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Pintura Electrostática</span>
                      <span className="font-medium">{formatCurrency(results.pinturaCost)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Herrajes (Chapa, Bisagras, Tornillos)</span>
                      <span className="font-medium">{formatCurrency(results.herrajesCost)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Soldadura y Pulido (Avg)</span>
                      <span className="font-medium">{formatCurrency(results.soldaduraCost + results.pulidoCost)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Procesos e Indirectos</h3>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Mano de Obra Directa</span>
                      <span className="font-medium">{formatCurrency(results.manoDeObraDirecta)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Costos Indirectos Prorrateados</span>
                      <span className="font-medium">{formatCurrency(results.costosIndirectos)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-600">Lavado Químico y Gas Horno</span>
                      <span className="font-medium">{formatCurrency(results.lavadoCost + results.gasCost)}</span>
                    </div>
                    <div className="flex justify-between bg-slate-50 p-3 rounded-lg mt-4">
                      <span className="font-bold text-slate-800">Margen de Utilidad ({config.profitMargin}%)</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.suggestedSalePrice - results.totalManufacturingCost)}</span>
                    </div>
                  </div>
                </div>

                {/* Main Action Card */}
                <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
                  <span className="text-slate-400 uppercase font-semibold text-sm tracking-widest">Precio de Venta Sugerido</span>
                  <div className="text-5xl font-black mt-2 mb-4 text-orange-400">{formatCurrency(results.suggestedSalePrice)}</div>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Este valor incluye el costo de fabricación de <span className="text-white">{formatCurrency(results.totalManufacturingCost)}</span> más un {config.profitMargin}% de margen bruto.
                  </p>
                </div>
              </div>
            </div>

            {/* Config Quick Adjustments (Always visible) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-wrap gap-6 items-center justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Margen de Utilidad Deseado (%)</label>
                <div className="flex items-center gap-3">
                   <input 
                    type="range" min="1" max="100" name="profitMargin" value={config.profitMargin} onChange={handleConfigChange}
                    className="w-48 accent-orange-500"
                  />
                  <span className="font-bold text-lg text-slate-700">{config.profitMargin}%</span>
                </div>
              </div>
              
              <div className="h-10 w-px bg-slate-200 hidden md:block"></div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Horas Hombre Estimadas</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" name="laborHoursPerCabinet" value={config.laborHoursPerCabinet} onChange={handleConfigChange}
                    className="w-20 px-3 py-1 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <span className="text-slate-500">Horas</span>
                </div>
              </div>

              <button 
                onClick={() => window.print()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m32 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir Costeo
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Electroimportados | Sistema Interno de Costeo de Producción</p>
      </footer>
    </div>
  );
};

export default App;
