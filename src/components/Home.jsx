import React, { useState } from 'react';
import { FaListUl, FaTimes } from 'react-icons/fa';

function DealsSection({ dealsData }) {
    const [search, setSearch] = useState('');
    const [showAllClients, setShowAllClients] = useState(false);
    const [showOnlyNegotiating, setShowOnlyNegotiating] = useState(false);

    // Filter logic (search only)
    const filteredDeals = dealsData.filter((deal) => {
        const searchMatch =
            deal.clientName.toLowerCase().includes(search.toLowerCase()) ||
            deal.dealName.toLowerCase().includes(search.toLowerCase()) ||
            deal.assigneeName.toLowerCase().includes(search.toLowerCase());
        return searchMatch;
    });

    // Status filter for "Active Deals"
    const statusFilteredDeals = showOnlyNegotiating
        ? filteredDeals.filter(deal => deal.status === 'negotiating')
        : filteredDeals;

    // Negotiating and Kickback deals for "My Deals" tab
    const negotiatingDeals = statusFilteredDeals.filter(deal => deal.status === 'negotiating');
    const kickbackDeals = statusFilteredDeals.filter(deal => deal.status === 'kickback');
    const negotiating2Deals = statusFilteredDeals.filter(deal => deal.status === 'negotiating-2');

    // Totals
    const calculateTotals = (deals) => {
        if (!deals) return { count: 0, total: 0 };
        const total = deals.reduce((sum, deal) => sum + Number(deal.dealBudget.replace(/,/g, '')), 0);
        return { count: deals.length, total };
    };
    const negotiatingTotals = calculateTotals(negotiatingDeals);
    const kickbackTotals = calculateTotals(kickbackDeals);
    const negotiating2Totals = calculateTotals(negotiating2Deals);

    // Button text logic
    const dealsButtonText = showOnlyNegotiating ? 'Active Deals' : 'Total Deals';

    return (
        <div className="bg-gray-50 py-6 px-4">
            <div className="container mx-auto">
                {/* Top Tabs */}
                <div className="bg-white rounded-md shadow-sm mb-4">
                    <div className="flex">
                        <button
                            className={`py-3 px-6 text-sm font-medium rounded-tl-md ${
                                !showAllClients
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setShowAllClients(false)}
                        >
                            My Deals
                        </button>
                        <button
                            className={`py-3 px-6 text-sm font-medium rounded-tr-md ${
                                showAllClients
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setShowAllClients(true)}
                        >
                            All clients
                        </button>
                    </div>
                </div>

                {/* Pipeline Header */}
                <div className="bg-white rounded-md shadow-sm py-3 px-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 sm:mb-0">
                        <span className="text-sm font-medium text-gray-700 mr-4">Pipeline</span>
                        <div className="flex items-center bg-blue-50 text-blue-500 rounded-md px-2 py-1 text-xs font-semibold">
                            <FaListUl className="mr-1" />
                            <span>List</span>
                        </div>
                        <span className="text-sm text-gray-600 ml-0 sm:ml-3 mt-2 sm:mt-0">
                            Total {statusFilteredDeals.length} Deals | Total Revenue in Pipeline: $
                            {statusFilteredDeals.reduce((sum, d) => sum + Number(d.dealBudget.replace(/,/g, '')), 0).toLocaleString()}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
                        <div className="relative mr-0 sm:mr-4 mb-2 sm:mb-0 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
                            />
                        </div>
                        <button
                            className={`bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-md py-2 px-3 text-sm font-semibold border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto ${
                                showOnlyNegotiating ? 'ring-2 ring-blue-400' : ''
                            }`}
                            onClick={() => setShowOnlyNegotiating((prev) => !prev)}
                        >
                            {dealsButtonText}
                        </button>
                    </div>
                </div>

                {/* All Clients Table */}
                {showAllClients && (
                    <div className="mb-4">
                        <div className="bg-white rounded-md shadow-sm mt-2 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal budget</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {statusFilteredDeals.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-6 text-gray-400">
                                                No deals found.
                                            </td>
                                        </tr>
                                    ) : (
                                        statusFilteredDeals.map((deal) => (
                                            <tr key={deal.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            {deal.clientInitials ? (
                                                                <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold text-sm ${deal.initialsBgColor}`}>
                                                                    {deal.clientInitials}
                                                                </div>
                                                            ) : (
                                                                <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center"></div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{deal.clientName}</div>
                                                            <div className="text-xs text-gray-500">{deal.clientSubName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{deal.dealName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">${deal.dealBudget}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            <div className={`rounded-full w-6 h-6 flex items-center justify-center text-white font-semibold text-xs ${deal.assigneeInitialsBgColor}`}>
                                                                {deal.assigneeInitials}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-900">{deal.assigneeName}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                        <FaTimes className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* My Deals: Negotiating and Kickback Sections */}
                {!showAllClients && (
                    <>
                        {/* Negotiating Section */}
                        <div className="mb-4">
                            <div className="bg-white rounded-md shadow-sm py-2 px-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-700">Negotiating</span>
                                    <span className="ml-2 text-xs text-gray-500">{negotiatingTotals.count}</span>
                                </div>
                                <span className="text-sm text-gray-600">
                                    ${negotiatingTotals.total.toLocaleString()}
                                </span>
                            </div>
                            <div className="bg-white rounded-md shadow-sm mt-2 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal budget</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {negotiatingDeals.map((deal) => (
                                            <tr key={deal.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            {deal.clientInitials ? (
                                                                <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold text-sm ${deal.initialsBgColor}`}>
                                                                    {deal.clientInitials}
                                                                </div>
                                                            ) : (
                                                                <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center"></div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{deal.clientName}</div>
                                                            <div className="text-xs text-gray-500">{deal.clientSubName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{deal.dealName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">${deal.dealBudget}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            <div className={`rounded-full w-6 h-6 flex items-center justify-center text-white font-semibold text-xs ${deal.assigneeInitialsBgColor}`}>
                                                                {deal.assigneeInitials}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-900">{deal.assigneeName}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                        <FaTimes className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Kickback Section */}
                        {!showOnlyNegotiating && (
                            <div className="mb-4">
                                <div className="bg-white rounded-md shadow-sm py-2 px-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-semibold text-gray-700">Kickback</span>
                                        <span className="ml-2 text-xs text-gray-500">{kickbackTotals.count}</span>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        ${kickbackTotals.total.toLocaleString()}
                                    </span>
                                </div>
                                <div className="bg-white rounded-md shadow-sm mt-2 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal budget</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                                                <th className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {kickbackDeals.map((deal) => (
                                                <tr key={deal.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                {deal.clientInitials ? (
                                                                    <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold text-sm ${deal.initialsBgColor}`}>
                                                                        {deal.clientInitials}
                                                                    </div>
                                                                ) : (
                                                                    <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center"></div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{deal.clientName}</div>
                                                                <div className="text-xs text-gray-500">{deal.clientSubName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{deal.dealName}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">${deal.dealBudget}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="mr-2">
                                                                <div className={`rounded-full w-6 h-6 flex items-center justify-center text-white font-semibold text-xs ${deal.assigneeInitialsBgColor}`}>
                                                                    {deal.assigneeInitials}
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-gray-900">{deal.assigneeName}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                                            <FaTimes className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Another Negotiating Section (Count 0) */}
                        <div className="mb-4">
                            <div className="bg-white rounded-md shadow-sm py-2 px-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500 mr-2">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-700">Negotiating</span>
                                    <span className="ml-2 text-xs text-gray-500">{negotiating2Totals.count}</span>
                                </div>
                                <span className="text-sm text-gray-600">${negotiating2Totals.total.toLocaleString()}</span>
                            </div>
                            {/* No data table here as the count is 0 */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function Home() {
    const dealsData = [
        {
            id: 1,
            clientInitials: 'CK',
            clientName: 'Chandan Kalita',
            clientSubName: 'Chandan',
            dealName: 'Chandan Deal',
            dealBudget: '5,000',
            assigneeInitials: 'MS',
            assigneeName: 'Michael Speed',
            initialsBgColor: 'bg-purple-500',
            assigneeInitialsBgColor: 'bg-purple-500',
            status: 'negotiating',
        },
        {
            id: 2,
            clientInitials: 'MS',
            clientName: 'michael speed',
            clientSubName: 'Michael',
            dealName: 'some deal 4',
            dealBudget: '7,000',
            assigneeInitials: 'MS',
            assigneeName: 'Michael Speed',
            initialsBgColor: 'bg-blue-500',
            assigneeInitialsBgColor: 'bg-blue-500',
            status: 'negotiating',
        },
        {
            id: 3,
            clientInitials: 'JD',
            clientName: 'John Doe',
            clientSubName: 'John',
            dealName: 'Alpha Project',
            dealBudget: '50,000',
            assigneeInitials: 'AS',
            assigneeName: 'Alice Smith',
            initialsBgColor: 'bg-green-500',
            assigneeInitialsBgColor: 'bg-green-500',
            status: 'kickback',
        },
        {
            id: 4,
            clientInitials: 'CK',
            clientName: 'Chandan Kalita',
            clientSubName: 'Chandan',
            dealName: 'Second Deal',
            dealBudget: '12,000',
            assigneeInitials: 'JD',
            assigneeName: 'John Doe',
            initialsBgColor: 'bg-purple-500',
            assigneeInitialsBgColor: 'bg-green-500',
            status: 'negotiating'
        },{
        id: 5,
        clientInitials: 'SK',
        clientName: 'Sanya Kapoor',
        clientSubName: 'Sanya',
        dealName: 'Project Alpha',
        dealBudget: '15,000',
        assigneeInitials: 'AR',
        assigneeName: 'Amit Roy',
        initialsBgColor: 'bg-purple-500',
        assigneeInitialsBgColor: 'bg-yellow-500',
        status: 'negotiating',
    },
    {
        id: 6,
        clientInitials: 'RV',
        clientName: 'Rohan Verma',
        clientSubName: 'Rohan',
        dealName: 'Beta Initiative',
        dealBudget: '25,000',
        assigneeInitials: 'SM',
        assigneeName: 'Sneha Mishra',
        initialsBgColor: 'bg-blue-500',
        assigneeInitialsBgColor: 'bg-green-500',
        status: 'negotiating',
    },
    {
        id: 7,
        clientInitials: 'PG',
        clientName: 'Priya Gill',
        clientSubName: 'Priya',
        dealName: 'Gamma Project',
        dealBudget: '35,000',
        assigneeInitials: 'KV',
        assigneeName: 'Kunal Verma',
        initialsBgColor: 'bg-green-500',
        assigneeInitialsBgColor: 'bg-red-500',
        status: 'kickback',
    },
    {
        id: 8,
        clientInitials: 'SR',
        clientName: 'Suresh Reddy',
        clientSubName: 'Suresh',
        dealName: 'Delta Plan',
        dealBudget: '45,000',
        assigneeInitials: 'AS',
        assigneeName: 'Anika Sharma',
        initialsBgColor: 'bg-yellow-500',
        assigneeInitialsBgColor: 'bg-purple-500',
        status: 'kickback',
    },
    {
        id: 9,
        clientInitials: 'NJ',
        clientName: 'Neha Joshi',
        clientSubName: 'Neha',
        dealName: 'Epsilon Campaign',
        dealBudget: '18,000',
        assigneeInitials: 'MR',
        assigneeName: 'Manish Rao',
        initialsBgColor: 'bg-pink-500',
        assigneeInitialsBgColor: 'bg-blue-500',
        status: 'negotiating',
    },
    {
        id: 10,
        clientInitials: 'AK',
        clientName: 'Arjun Kapoor',
        clientSubName: 'Arjun',
        dealName: 'Zeta Project',
        dealBudget: '28,000',
        assigneeInitials: 'PG',
        assigneeName: 'Pooja Gupta',
        initialsBgColor: 'bg-teal-500',
        assigneeInitialsBgColor: 'bg-pink-500',
        status: 'negotiating',
    },
        // Add more deal objects as needed
    ];

    return (
        <div>
            {/* Your Navbar and Header components would go here */}
            <DealsSection dealsData={dealsData} />
        </div>
    );
}

export default Home;