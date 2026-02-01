import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Filter, Map, TrendingUp, Database, Building, TreePine, Package, Hexagon } from 'lucide-react';

const Dashboard = () => {
    const [selectedDept, setSelectedDept] = useState('Tous');
    const [selectedType, setSelectedType] = useState('Tous');
    const [activeView, setActiveView] = useState('heatmap');
    const [selectedKPI, setSelectedKPI] = useState('total');

    // Listes de référence
    const departements = ['Tous', 'ALIBORI', 'ATACORA', 'ATLANTIQUE', 'BORGOU', 'COLLINES', 'COUFFO', 'DONGA', 'LITTORAL', 'MONO', 'OUÉMÉ', 'PLATEAU', 'ZOU'];
    const types = ['Tous', 'Pierre', 'Sable', 'Gravier', 'Argile', 'Kaolin', 'Terre', 'Latérite', 'Bois'];

    // Données complètes
    const materiauxMineraux = [
        { id: 1, materiau: "GRANITE", dept: "COLLINES", commune: "Dassa-Zoumè", site: "Fita", reserves: "6000000", type: "Pierre" },
        { id: 2, materiau: "GRANITE", dept: "BORGOU", commune: "Tchaourou", site: "Tchatchou", reserves: "150000000", type: "Pierre" },
        { id: 3, materiau: "GRANITE", dept: "BORGOU", commune: "Sinendé", site: "Sinendé centre", reserves: "0", type: "Pierre" },
        { id: 4, materiau: "GRANITE", dept: "ATACORA", commune: "Djougou", site: "Wêwê", reserves: "300000000", type: "Pierre" },
        { id: 5, materiau: "GRANITE", dept: "COLLINES", commune: "Savalou", site: "Gobada", reserves: "0", type: "Pierre" },
        { id: 6, materiau: "MONZOSYÉNITE", dept: "BORGOU", commune: "Tchaourou", site: "Wari-Maro", reserves: "2400106", type: "Pierre" },
        { id: 7, materiau: "CHARNOCKITE", dept: "COLLINES", commune: "Dassa-Zoumè", site: "Mbètèkoukou", reserves: "0", type: "Pierre" },
        { id: 8, materiau: "CHARNOCKITE", dept: "ALIBORI", commune: "Banikoara", site: "Pototouma", reserves: "14000000", type: "Pierre" },
        { id: 9, materiau: "MARBRE", dept: "COLLINES", commune: "Ouèssè", site: "Idadjo", reserves: "1200000", type: "Pierre" },
        { id: 10, materiau: "MARBRE", dept: "COLLINES", commune: "Savè", site: "Montèwo", reserves: "0", type: "Pierre" },
        { id: 11, materiau: "MARBRE", dept: "ZOU", commune: "Abomey", site: "Bagbononhoué", reserves: "0", type: "Pierre" },
        { id: 12, materiau: "MARBRE", dept: "COUFFO", commune: "Aplahoué", site: "Atomè-Lonkly", reserves: "65000000", type: "Pierre" },
        { id: 13, materiau: "CALCAIRE", dept: "PLATEAU", commune: "Adja-Ouèrè", site: "Onigbolo", reserves: "90000000", type: "Pierre" },
        { id: 14, materiau: "CALCAIRE", dept: "PLATEAU", commune: "Pobè", site: "Massè", reserves: "17500000", type: "Pierre" },
        { id: 15, materiau: "CALCAIRE", dept: "MONO", commune: "Bopa", site: "Gbakpodji", reserves: "15000000", type: "Pierre" },
        { id: 16, materiau: "CALCAIRE", dept: "ZOU", commune: "Zagnanado", site: "Ahlan-Aïzè", reserves: "1575000000", type: "Pierre" },
        { id: 17, materiau: "QUARTZITE", dept: "ATACORA", commune: "Natitingou", site: "Kota", reserves: "40000", type: "Pierre" },
        { id: 18, materiau: "QUARTZITE", dept: "DONGA", commune: "Copargo", site: "Babazaoré", reserves: "0", type: "Pierre" },
        { id: 19, materiau: "RHYOLITE", dept: "COLLINES", commune: "Dassa-Zoumè", site: "Idaho-Mahou", reserves: "0", type: "Pierre" },
        { id: 20, materiau: "JASPE", dept: "ATACORA", commune: "Tanguiéta", site: "Mamoussa", reserves: "0", type: "Pierre" },
        { id: 21, materiau: "PEGMATITE", dept: "BORGOU", commune: "Nikki", site: "Nikki", reserves: "0", type: "Pierre" }
    ];

    const granulats = [
        { id: 22, materiau: "SABLE Jaune", dept: "OUÉMÉ", commune: "Sèmè-Kpodji", reserves: "0", type: "Sable" },
        { id: 23, materiau: "SABLE Blanc", dept: "ATLANTIQUE", commune: "Abomey-Calavi", reserves: "10000000", type: "Sable" },
        { id: 24, materiau: "SABLE de Mer", dept: "LITTORAL", commune: "Cotonou", reserves: "0", type: "Sable" },
        { id: 25, materiau: "SABLE fluvial", dept: "ATLANTIQUE", commune: "Sô-Ava", reserves: "29656250", type: "Sable" },
        { id: 26, materiau: "SABLE SILICIEUX", dept: "MONO", commune: "Houéyogbé", reserves: "700000", type: "Sable" },
        { id: 27, materiau: "SABLE SILICIEUX", dept: "OUÉMÉ", commune: "Sèmè-Kpodji", reserves: "1200000", type: "Sable" },
        { id: 28, materiau: "GRAVIER granite", dept: "BORGOU", commune: "Pèrèrè", reserves: "0", type: "Gravier" },
        { id: 29, materiau: "GRAVIER granite", dept: "BORGOU", commune: "Tchaourou", reserves: "150000000", type: "Gravier" },
        { id: 30, materiau: "GRAVIER roulé", dept: "MONO", commune: "Houéyogbé", reserves: "13081000", type: "Gravier" },
        { id: 31, materiau: "GRAVIER latéritique", dept: "BORGOU", commune: "Parakou", reserves: "0", type: "Gravier" }
    ];

    const terres = [
        { id: 32, materiau: "ARGILE noire", dept: "MONO", commune: "Athiémé", reserves: "0", type: "Argile" },
        { id: 33, materiau: "ARGILE rouge", dept: "BORGOU", commune: "Pèrèrè", reserves: "0", type: "Argile" },
        { id: 34, materiau: "ARGILE", dept: "ZOU", commune: "Zogbodomey", reserves: "11500000", type: "Argile" },
        { id: 35, materiau: "KAOLIN blanc", dept: "PLATEAU", commune: "Kétou", reserves: "1000000", type: "Kaolin" },
        { id: 36, materiau: "TERRE DE BARRE", dept: "PLATEAU", commune: "Sakété", reserves: "0", type: "Terre" },
        { id: 37, materiau: "TERRE DE BARRE", dept: "ATLANTIQUE", commune: "Allada", reserves: "0", type: "Terre" },
        { id: 38, materiau: "TERRE DE BARRE", dept: "OUÉMÉ", commune: "Adjohoun", reserves: "0", type: "Terre" },
        { id: 39, materiau: "TERRE DE BARRE", dept: "BORGOU", commune: "Parakou", reserves: "0", type: "Terre" },
        { id: 40, materiau: "LATÉRITE", dept: "BORGOU", commune: "Sinendé", reserves: "0", type: "Latérite" },
        { id: 41, materiau: "LATÉRITE", dept: "BORGOU", commune: "Parakou", reserves: "226000", type: "Latérite" },
        { id: 42, materiau: "LATÉRITE", dept: "ALIBORI", commune: "Kalalé", reserves: "0", type: "Latérite" }
    ];

    const bois = [
        { id: 43, essence: "TECK", dept: "PLATEAU", commune: "Kétou", reserves: "31850", type: "Bois" },
        { id: 44, essence: "TECK", dept: "ZOU", commune: "Zogbodomey", reserves: "16250", type: "Bois" },
        { id: 45, essence: "TECK", dept: "OUÉMÉ", commune: "Dangbo", reserves: "3017", type: "Bois" },
        { id: 46, essence: "ACACIA", dept: "ATLANTIQUE", commune: "Tori-Bossito", reserves: "500", type: "Bois" },
        { id: 47, essence: "ACACIA", dept: "ZOU", commune: "Abomey", reserves: "40", type: "Bois" },
        { id: 48, essence: "IROKO", dept: "PLATEAU", commune: "Adja-Ouèrè", reserves: "191", type: "Bois" },
        { id: 49, essence: "AFZELIA", dept: "PLATEAU", commune: "Adja-Ouèrè", reserves: "191", type: "Bois" },
        { id: 50, essence: "KHAYA", dept: "BORGOU", commune: "Parakou", reserves: "177542", type: "Bois" },
        { id: 51, essence: "KOSSO", dept: "ATACORA", commune: "Natitingou", reserves: "0", type: "Bois" },
        { id: 52, essence: "ISOBERLINIA", dept: "BORGOU", commune: "Nikki", reserves: "0", type: "Bois" },
        { id: 53, essence: "BAMBOU", dept: "ATLANTIQUE", commune: "Abomey-Calavi", reserves: "0", type: "Végétal" },
        { id: 54, essence: "PALMIER", dept: "PLATEAU", commune: "Kétou", reserves: "0", type: "Végétal" },
        { id: 55, essence: "RAPHIA", dept: "OUÉMÉ", commune: "Adjohoun", reserves: "0", type: "Végétal" }
    ];

    // Calcul des KPI par département
    const deptKPIs = useMemo(() => {
        const allData = [...materiauxMineraux, ...granulats, ...terres, ...bois];
        const kpis = {};

        departements.filter(d => d !== 'Tous').forEach(dept => {
            const deptData = allData.filter(item => item.dept === dept);
            const totalSites = deptData.length;
            const totalReserves = deptData.reduce((sum, item) => {
                const reserve = parseFloat(item.reserves) || 0;
                return sum + reserve;
            }, 0);
            const communes = new Set(deptData.map(item => item.commune)).size;

            kpis[dept] = {
                totalSites,
                totalReserves,
                communes,
                pierres: deptData.filter(d => d.type === 'Pierre').length,
                sables: deptData.filter(d => d.type === 'Sable').length,
                argiles: deptData.filter(d => ['Argile', 'Terre', 'Latérite', 'Kaolin'].includes(d.type)).length,
                bois: deptData.filter(d => ['Bois', 'Végétal'].includes(d.type)).length
            };
        });

        return kpis;
    }, []);

    const stats = useMemo(() => {
        const departementsUniques = new Set([...materiauxMineraux, ...granulats, ...terres, ...bois].map(m => m.dept));
        const communesUniques = new Set([...materiauxMineraux, ...granulats, ...terres, ...bois].map(m => m.commune));

        return {
            totalDepartements: departementsUniques.size,
            totalCommunes: communesUniques.size,
            totalSitesMineraux: materiauxMineraux.length + granulats.length + terres.length,
            totalSitesVegetaux: bois.length
        };
    }, []);

    const repartitionType = [
        { name: "Pierres", value: materiauxMineraux.length, color: "#8B4513" },
        { name: "Granulats", value: granulats.length, color: "#DAA520" },
        { name: "Terres/Argiles", value: terres.length, color: "#CD853F" },
        { name: "Bois", value: bois.length, color: "#228B22" }
    ];

    const repartitionDept = useMemo(() => {
        const deptCount = {};
        [...materiauxMineraux, ...granulats, ...terres, ...bois].forEach(item => {
            deptCount[item.dept] = (deptCount[item.dept] || 0) + 1;
        });
        return Object.entries(deptCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, []);

    const filteredData = useMemo(() => {
        let data = [...materiauxMineraux, ...granulats, ...terres, ...bois];
        if (selectedDept !== 'Tous') {
            data = data.filter(item => item.dept === selectedDept);
        }
        if (selectedType !== 'Tous') {
            data = data.filter(item => item.type === selectedType);
        }
        return data;
    }, [selectedDept, selectedType]);

    const getColorForKPI = (dept, kpiType) => {
        const kpi = deptKPIs[dept];
        if (!kpi) return '#e2e8f0';

        const value = kpiType === 'total' ? kpi.totalSites :
            kpiType === 'reserves' ? kpi.totalReserves / 1000000 :
                kpiType === 'communes' ? kpi.communes :
                    kpi.totalSites;

        if (value === 0) return '#f1f5f9';
        if (value < 3) return '#dcfce7';
        if (value < 6) return '#86efac';
        if (value < 10) return '#22c55e';
        return '#15803d';
    };

    const getValueForKPI = (dept, kpiType) => {
        const kpi = deptKPIs[dept];
        if (!kpi) return 0;

        return kpiType === 'total' ? kpi.totalSites :
            kpiType === 'reserves' ? Math.round(kpi.totalReserves / 1000000) :
                kpiType === 'communes' ? kpi.communes :
                    kpi.totalSites;
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 p-4">
            <div className="max-w-7xl mx-auto">

                {/* En-tête */}
                <div className="bg-white rounded-xl shadow-2xl p-6 mb-6 border-l-4 border-green-600">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Database className="w-10 h-10 text-green-700" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-800 mb-1">
                                Tableau de Bord - Matériaux Locaux du Bénin
                            </h1>
                            <p className="text-gray-600">
                                Visualisation par département - MCVDD 2025
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { id: 'heatmap', label: 'Vue Heatmap', icon: Hexagon },
                            { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
                            { id: 'mineraux', label: 'Matériaux Minéraux', icon: Package },
                            { id: 'vegetaux', label: 'Matériaux Végétaux', icon: TreePine }
                        ].map(view => (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${activeView === view.id
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <view.icon className="w-4 h-4" />
                                {view.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPIs Globaux */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg">
                        <Map className="w-7 h-7 mb-2 opacity-80" />
                        <p className="text-blue-100 text-xs font-semibold">Départements</p>
                        <p className="text-3xl font-bold">{stats.totalDepartements}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-5 shadow-lg">
                        <Building className="w-7 h-7 mb-2 opacity-80" />
                        <p className="text-green-100 text-xs font-semibold">Communes</p>
                        <p className="text-3xl font-bold">{stats.totalCommunes}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-5 shadow-lg">
                        <Package className="w-7 h-7 mb-2 opacity-80" />
                        <p className="text-amber-100 text-xs font-semibold">Sites Minéraux</p>
                        <p className="text-3xl font-bold">{stats.totalSitesMineraux}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-5 shadow-lg">
                        <TreePine className="w-7 h-7 mb-2 opacity-80" />
                        <p className="text-emerald-100 text-xs font-semibold">Sites Végétaux</p>
                        <p className="text-3xl font-bold">{stats.totalSitesVegetaux}</p>
                    </div>
                </div>

                {/* Vue Heatmap */}
                {activeView === 'heatmap' && (
                    <div className="space-y-6">
                        {/* Sélecteur KPI */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Choisissez l'indicateur</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { id: 'total', label: 'Nombre de Sites', icon: '🎯' },
                                    { id: 'reserves', label: 'Réserves (M m³)', icon: '💎' },
                                    { id: 'communes', label: 'Communes', icon: '📍' },
                                    { id: 'diversity', label: 'Diversité', icon: '🌈' }
                                ].map(kpi => (
                                    <button
                                        key={kpi.id}
                                        onClick={() => setSelectedKPI(kpi.id)}
                                        className={`p-4 rounded-lg border-2 transition-all ${selectedKPI === kpi.id
                                                ? 'border-green-600 bg-green-50 shadow-md'
                                                : 'border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{kpi.icon}</div>
                                        <p className="font-bold text-sm text-gray-800">{kpi.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grille Heatmap */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Heatmap des Départements</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {departements.filter(d => d !== 'Tous').map(dept => {
                                    const kpi = deptKPIs[dept];
                                    const value = getValueForKPI(dept, selectedKPI);
                                    const color = getColorForKPI(dept, selectedKPI);

                                    return (
                                        <div
                                            key={dept}
                                            onClick={() => setSelectedDept(dept)}
                                            className={`relative p-6 rounded-xl transition-all cursor-pointer border-2 ${selectedDept === dept
                                                    ? 'border-green-600 shadow-xl scale-105'
                                                    : 'border-transparent hover:border-green-300 hover:shadow-lg'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        >
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-gray-800 mb-2">{value}</div>
                                                <div className="font-bold text-sm text-gray-700 uppercase tracking-wide">{dept}</div>
                                                {kpi && (
                                                    <div className="mt-3 pt-3 border-t border-gray-400 text-xs text-gray-700">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <div className="font-semibold">{kpi.pierres}</div>
                                                                <div className="text-gray-600">Pierres</div>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold">{kpi.bois}</div>
                                                                <div className="text-gray-600">Bois</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Légende */}
                            <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#f1f5f9' }}></div>
                                    <span className="text-sm text-gray-700">Aucun</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#dcfce7' }}></div>
                                    <span className="text-sm text-gray-700">Faible</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#86efac' }}></div>
                                    <span className="text-sm text-gray-700">Moyen</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#22c55e' }}></div>
                                    <span className="text-sm text-gray-700">Bon</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded" style={{ backgroundColor: '#15803d' }}></div>
                                    <span className="text-sm text-gray-700">Excellent</span>
                                </div>
                            </div>
                        </div>

                        {/* Détails département sélectionné */}
                        {selectedDept !== 'Tous' && deptKPIs[selectedDept] && (
                            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-lg p-6">
                                <h3 className="text-2xl font-bold mb-4">📊 Détails : {selectedDept}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                        <div className="text-3xl font-bold">{deptKPIs[selectedDept].totalSites}</div>
                                        <div className="text-sm opacity-90">Sites Total</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                        <div className="text-3xl font-bold">{deptKPIs[selectedDept].communes}</div>
                                        <div className="text-sm opacity-90">Communes</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                        <div className="text-3xl font-bold">{deptKPIs[selectedDept].pierres}</div>
                                        <div className="text-sm opacity-90">Pierres</div>
                                    </div>
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                        <div className="text-3xl font-bold">{deptKPIs[selectedDept].bois}</div>
                                        <div className="text-sm opacity-90">Bois</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Vue Overview */}
                {activeView === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Répartition par Type</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={repartitionType}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {repartitionType.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Sites par Département</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={repartitionDept}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Vue Minéraux */}
                {activeView === 'mineraux' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Filter className="w-5 h-5 text-gray-600" />
                                <h3 className="text-lg font-bold text-gray-800">Filtres</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select
                                    value={selectedDept}
                                    onChange={(e) => setSelectedDept(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2"
                                >
                                    {departements.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2"
                                >
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Résultats ({filteredData.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Matériau</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Département</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Commune</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filteredData.slice(0, 20).map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-medium">{item.materiau || item.essence}</td>
                                                <td className="px-4 py-3 text-sm">{item.dept}</td>
                                                <td className="px-4 py-3 text-sm">{item.commune}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                        {item.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vue Végétaux */}
                {activeView === 'vegetaux' && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Ressources Forestières</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bois.map((item, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <TreePine className="w-8 h-8 text-green-600 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800">{item.essence}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{item.dept} - {item.commune}</p>
                                            {item.reserves !== "0" && (
                                                <p className="text-sm text-green-700 font-semibold mt-2">📍 {item.reserves} ha</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;