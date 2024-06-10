export default function CardTurnos(date, time, userId, status, description) {
  return (
    <div>
      <span>{date}</span>
      <span>{time}</span>
      <span>{status}</span>
      <span>{description}</span>
    </div>
  );
}
