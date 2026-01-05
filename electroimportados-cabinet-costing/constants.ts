
import { Config, GaugeType } from './types';

export const DEFAULT_CONFIG: Config = {
  laminaPriceG18: 185000,
  laminaPriceG20: 160000,
  pinturaKgPrice: 32000,
  soldaduraAvgPrice: 4500,
  discoPulirAvgPrice: 2800,
  bisagraUnitPrice: 3500,
  chapaSmallPrice: 12000,
  chapaLargePrice: 18000,
  tornilloPuestaTierraPrice: 500,
  tornilloFijacionBandejaPrice: 300,

  monthlyProduction: 100,
  gasPipetaPrice: 85000,
  lavadoQuimicosPrice: 120000, // Kit of 3 chemicals every 2 months
  monthlyRent: 2500000,
  monthlySalaries: 4500000,
  monthlyUtilities: 800000,

  mermaLamina: 1.20, // 20% waste
  pinturaGrPerM2: 250, 
  pinturaPerdidaFactor: 1.30, // 30% loss
  laborHoursPerCabinet: 4,
  hourlyRate: 15000,
  profitMargin: 35,
};

export const SHEET_SIZE_M2 = 2.5 * 1.2;
