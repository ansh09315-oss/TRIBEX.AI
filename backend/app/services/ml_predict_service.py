from typing import List, Dict, Any

class MLPredictService:
    @staticmethod
    def calculate_pvtg_dropout_probability(
        active_renewals: int,
        dropouts_detected: int,
        distance_to_bank_km: float = 18.5,
        is_harvest_season: bool = True
    ) -> Dict[str, Any]:
        """
        Simulates ML classification model inferring dropout risk score for PVTG clusters.
        Features: renewal trend, KYC bank distance, seasonal migration factors.
        """
        total = active_renewals + dropouts_detected
        retention_rate = (active_renewals / total) * 100 if total > 0 else 85.0
        
        # Risk model calculation
        base_risk = 1.0 - (retention_rate / 100.0)
        migration_penalty = 0.08 if is_harvest_season else 0.0
        distance_penalty = 0.05 if distance_to_bank_km > 20 else 0.0
        
        risk_score = round(min(0.99, base_risk + migration_penalty + distance_penalty), 2)
        
        if risk_score > 0.25:
            alert = "CRITICAL_INTERVENTION_NEEDED"
            intervention = "Deploy Mobile VLE Biometric Van & Doorstep DBT Advance"
        elif risk_score > 0.15:
            alert = "MODERATE_WARNING"
            intervention = "Assign District Tribal Mentor for Academic Counseling"
        else:
            alert = "HEALTHY_RETENTION"
            intervention = "Standard Automated Renewal"
            
        return {
            "retention_rate_pct": round(retention_rate, 1),
            "risk_score": risk_score,
            "alert_badge": alert,
            "recommended_intervention": intervention
        }

ml_predict_service = MLPredictService()
