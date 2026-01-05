
import { CabinetInput, Config, CostBreakdown, GaugeType, ChapaSize } from '../types';
import { SHEET_SIZE_M2 } from '../constants';

export const calculateCost = (input: CabinetInput, config: Config): CostBreakdown => {
  const { height, width, depth, gauge, chapaType } = input;
  
  // Convert cm to meters
  const h = height / 100;
  const w = width / 100;
  const d = depth / 100;

  // 1. Surface Area for Sheet and Paint
  // Body = Back + 2 Sides + Top + Bottom
  const backArea = w * h;
  const topBottomArea = (w * d) * 2;
  const sidesArea = (h * d) * 2;
  const doorArea = w * h;
  const trayArea = (w - 0.05) * (h - 0.05); // slightly smaller than back

  const totalAreaM2 = backArea + topBottomArea + sidesArea + doorArea + trayArea;
  const effectiveAreaWithFolds = totalAreaM2 * config.mermaLamina;

  // Lamina Cost
  const sheetPrice = gauge === GaugeType.G18 ? config.laminaPriceG18 : config.laminaPriceG20;
  const costPerM2 = sheetPrice / SHEET_SIZE_M2;
  const laminaCost = effectiveAreaWithFolds * costPerM2;

  // 2. Paint (Double sided usually, but let's assume external surface + internal is roughly 2x area of the metal usage or use specific m2)
  // Paint usually covers both sides of most parts
  const areaToPaint = totalAreaM2 * 2; 
  const kgPintura = (areaToPaint * config.pinturaGrPerM2 * config.pinturaPerdidaFactor) / 1000;
  const pinturaCost = kgPintura * config.pinturaKgPrice;

  // 3. Hardware (Herrajes)
  const bisagrasCost = config.bisagraUnitPrice * 2; // Standard 2 bisagras
  const puestaTierraCost = config.tornilloPuestaTierraPrice * 2;
  
  // Tray Screws: 2 for small, 4 for large (threshold 60cm height)
  const numTrayScrews = height >= 60 ? 4 : 2;
  const trayScrewsCost = numTrayScrews * config.tornilloFijacionBandejaPrice;
  
  const chapaCost = chapaType === ChapaSize.SMALL ? config.chapaSmallPrice : config.chapaLargePrice;
  const herrajesCost = bisagrasCost + puestaTierraCost + trayScrewsCost + chapaCost;

  // 4. Prorated Costs
  const monthlyVolume = Math.max(config.monthlyProduction, 1);
  
  // Chemicals kit lasts 2 months
  const lavadoCost = (config.lavadoQuimicosPrice / 2) / monthlyVolume;
  
  // Gas: 1 pipeta every 20 days -> 1.5 pipetas/month
  const gasCost = (config.gasPipetaPrice * 1.5) / monthlyVolume;

  // Indirects
  const fijosMensuales = config.monthlyRent + config.monthlySalaries + config.monthlyUtilities;
  const costosIndirectos = fijosMensuales / monthlyVolume;

  // 5. Labor (Direct)
  const manoDeObraDirecta = config.laborHoursPerCabinet * config.hourlyRate;

  // Totals
  const totalManufacturingCost = 
    laminaCost + 
    pinturaCost + 
    config.soldaduraAvgPrice + 
    config.discoPulirAvgPrice + 
    lavadoCost + 
    gasCost + 
    herrajesCost + 
    manoDeObraDirecta + 
    costosIndirectos;

  const suggestedSalePrice = totalManufacturingCost * (1 + (config.profitMargin / 100));

  return {
    laminaCost,
    pinturaCost,
    soldaduraCost: config.soldaduraAvgPrice,
    pulidoCost: config.discoPulirAvgPrice,
    lavadoCost,
    gasCost,
    herrajesCost,
    manoDeObraDirecta,
    costosIndirectos,
    totalManufacturingCost,
    suggestedSalePrice
  };
};
