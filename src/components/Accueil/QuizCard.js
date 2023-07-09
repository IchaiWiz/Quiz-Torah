import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import defaultImage from "../../images/Har-Sinai.jpg"; // Ajustez le chemin selon l'emplacement de votre image

const QuizCard = ({ title, description, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, width: "100%", flex: 1 }}>
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={imageUrl || defaultImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Commencer le quiz</Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
