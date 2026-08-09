import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './OwnerPages.css'

const OwnerOrders = ({ url }) => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + '/api/order/list')
            if (response.data.success) {
                setOrders(response.data.data.reverse())
            } else {
                toast.error('Failed to fetch orders')
            }
        } catch (error) {
            toast.error('Error fetching orders')
        }
    }

    const updateStatus = async (orderId, status) => {
        try {
            const response = await axios.post(url + '/api/order/status', { orderId, status })
            if (response.data.success) {
                toast.success('Order status updated!')
                fetchOrders()
            }
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const statusColors = {
        'Food Processing': '#f59e0b',
        'Out for Delivery': '#3b82f6',
        'Delivered': '#22c55e',
    }

    return (
        <div className='owner-page'>
            <h2>All Orders</h2>
            <p className='page-sub'>Manage and track all customer orders</p>

            <div className='owner-stats'>
                <div className='stat-card'>
                    <span className='stat-num'>{orders.length}</span>
                    <span className='stat-label'>Total Orders</span>
                </div>
                <div className='stat-card'>
                    <span className='stat-num'>{orders.filter(o => o.payment).length}</span>
                    <span className='stat-label'>Paid</span>
                </div>
                <div className='stat-card'>
                    <span className='stat-num'>{orders.filter(o => o.status === 'Delivered').length}</span>
                    <span className='stat-label'>Delivered</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className='empty-state'>
                    <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>📦</span>
                    No orders yet
                </div>
            ) : (
                <div className='owner-orders-list'>
                    {orders.map((order, index) => (
                        <div key={index} className='owner-order-card'>
                            <div className='order-icon'>📦</div>
                            <div className='order-info'>
                                <p className='order-items-list'>
                                    {Array.isArray(order.items)
                                        ? order.items.map((item, i) => `${item.name} x${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`)
                                        : 'Items unavailable'}
                                </p>
                                <p className='order-address'>
                                    {order.address?.street}, {order.address?.city}
                                </p>
                            </div>
                            <div className='order-amount-status'>
                                <p className='amount'>${order.amount}</p>
                                <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                                    {order.payment ? '✓ Paid' : '✗ Unpaid'}
                                </span>
                            </div>
                            <div className='status-control'>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                    style={{ borderColor: statusColors[order.status] || '#ff6b6b' }}
                                >
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <span className='status-dot' style={{ background: statusColors[order.status] || '#ff6b6b' }}></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OwnerOrders
