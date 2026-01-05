
export enum GaugeType {
  G18 = 'Calibre 18',
  G20 = 'Calibre 20'
}

export enum ChapaSize {
  SMALL = 'Pequeña',
  LARGE = 'Grande'
}

export interface Config {
  // Base material prices
  laminaPriceG18: number; // Price per full sheet (2.5x1.2)
  laminaPriceG20: number; // Price per full sheet (2.5x1.2)
  pinturaKgPrice: number; // Price per Kg
  soldaduraAvgPrice: number; // Fixed avg per cabinet
  discoPulirAvgPrice: number; // Fixed avg per cabinet
  bisagraUnitPrice: number;
  chapaSmallPrice: number;
  chapaLargePrice: number;
  tornilloPuestaTierraPrice: number;
  tornilloFijacionBandejaPrice: number;

  // Process & Indirects
  monthlyProduction: number; // Units per month for prorating
  gasPipetaPrice: number; // Price for 1 tank
  lavadoQuimicosPrice: number; // Total cost for the 3 chemicals kit
  monthlyRent: number;
  monthlySalaries: number;
  monthlyUtilities: number;

  // Technical Factors
  mermaLamina: number; // Factor (e.g. 1.15 for 15% waste)
  pinturaGrPerM2: number; // g/m2
  pinturaPerdidaFactor: number; // Factor (e.g. 1.25 for 25% loss)
  laborHoursPerCabinet: number;
  hourlyRate: number;
  profitMargin: number; // percentage
}

export interface CabinetInput {
  height: number; // cm
  width: number; // cm
  depth: number; // cm
  gauge: GaugeType;
  chapaType: ChapaSize;
}

export interface CostBreakdown {
  laminaCost: number;
  pinturaCost: number;
  soldaduraCost: number;
  pulidoCost: number;
  lavadoCost: number;
  gasCost: number;
  herrajesCost: number;
  manoDeObraDirecta: number;
  costosIndirectos: number;
  totalManufacturingCost: number;
  suggestedSalePrice: number;
}
