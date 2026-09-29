import React from 'react'
import CustomPieChart from './PieChart';
import { useTranslation } from 'react-i18next';

const PortfolioOverview = () => {

    const { t } = useTranslation()

    const chartData = {
        assetAllocation: [
            { name: t("portfolio.text12"), value: 82, color: '#f3c46e' },
            { name: t("portfolio.text13"), value: 18, color: '#bc7b36' },
        ],
        propertyType: [
            { name: t("portfolio.text14"), value: 48, color: '#38495a' },
            { name: t("portfolio.text15"), value: 21, color: '#102e5b' },
            { name: t("portfolio.text16"), value: 15, color: '#093a70' },
            { name: t("portfolio.text17"), value: 9, color: '#274b83' },
            { name: t("portfolio.text18"), value: 5, color: '#577cbe' },
            { name: t("portfolio.text19"), value: 2, color: '#889ecf' },
        ],
        geography: [
            { name: t("portfolio.text20"), value: 40, color: '#1a5c2d' },
            { name: t("portfolio.text21"), value: 28, color: '#4a825d' },
            { name: t("portfolio.text22"), value: 16, color: '#66967a' },
            { name: t("portfolio.text23"), value: 7, color: '#8fbca3' },
            { name: t("portfolio.text24"), value: 9, color: '#c5e0cd' },
        ],
    };

return (
  <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap:'wrap' }}>
    {/* Chart 1 */}
    <CustomPieChart data={chartData.assetAllocation} title="ASSET ALLOCATION" />

    {/* Chart 2 */}
    <CustomPieChart data={chartData.propertyType} title="PROPERTY TYPE" />

    {/* Chart 3 */}
    <CustomPieChart data={chartData.geography} title="GEOGRAPHY" />
  </div>
)};

export default PortfolioOverview