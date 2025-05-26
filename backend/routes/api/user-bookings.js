'use strict';
const express = require('express');
const router = express.Router();
const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET /api/bookings/
router.get('/', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: { model: Spot, attributes: ['id','name','city','state','country'] }
  });
  return res.json({ Bookings: bookings });
});

module.exports = router;

// delete /api/bookings/:bookingId

router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: req.user.id
    }
  });
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  await booking.destroy();
  return res.status(204).end();
});


// edit /api/bookings/:bookingId

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(bookingId);
  
    if (!booking) return res.status(404).json({ message: "Booking couldn't be found" });
    if (booking.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'endDate cannot be on or before startDate' });
    }
  
    // conflict check excluding this booking
    const conflict = await Booking.findOne({
      where: {
        id: { [Op.ne]: bookingId },
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate:   { [Op.between]: [startDate, endDate] } },
          { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: endDate } }
        ]
      }
    });
    if (conflict) return res.status(403).json({ message: 'Spot is already booked for those dates' });
  
    booking.startDate = startDate;
    booking.endDate   = endDate;
    await booking.save();
    return res.json(booking);

  });