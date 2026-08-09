import React, { useState, useEffect } from 'react'
import './Order.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = ({ url }) => {
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
        <div className='orders-page'>
            <h2>All Orders</h2>
            <p className='page-sub'>Manage and track all customer orders</p>

            <div className='orders-stats'>
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
                <div className='stat-card'>
                    <span className='stat-num'>{orders.filter(o => o.status === 'Out for Delivery').length}</span>
                    <span className='stat-label'>Out for Delivery</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className='no-orders'>
                    <span>📦</span>
                    <p>No orders yet</p>
                </div>
            ) : (
                <div className='orders-list'>
                    {orders.map((order, index) => (
                        <div key={index} className='order-card'>
                            <div className='order-icon'>📦</div>

                            <div className='order-items'>
                                <p className='order-items-list'>
                                    {Array.isArray(order.items)
                                        ? order.items.map((item, i) => `${item.name} x${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`)
                                        : 'Items unavailable'}
                                </p>
                                <p className='order-address'>
                                    {order.address?.street}, {order.address?.city}
                                </p>
                                <p className='order-count'>{Array.isArray(order.items) ? order.items.length : 0} item(s)</p>
                            </div>

                            <div className='order-amount'>
                                <p>${order.amount}</p>
                                <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                                    {order.payment ? '✓ Paid' : '✗ Unpaid'}
                                </span>
                            </div>

                            <div className='order-status-control'>
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

export default Order