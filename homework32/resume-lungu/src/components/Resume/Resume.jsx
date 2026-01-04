import React from 'react';
import { 
  Container, Typography, Paper, Box, Chip, Divider, Stack, List, ListItem, ListItemText, ListItemIcon 
} from '@mui/material';
import { useSelector } from 'react-redux';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';

const Resume = () => {
  const lang = useSelector((state) => state.language.lang);

  const content = {
    en: {
      title: "Lungu Petro",
      subtitle: "Front-End Developer (React) 👨‍💻",
      summaryTitle: "Professional Summary 📝",
      summaryText: "Highly motivated professional transitioning into Front-End Development with 15+ years of experience in management and design. Currently enhancing technical skills through specialized courses. 🚀",
      skillsTitle: "Technical Skills 🛠️",
      expTitle: "Work Experience 💼",
      eduTitle: "Education & Training 🎓",
      langTitle: "Languages & Info 🌐",
      experience: [
        { period: "2014-2024", role: "Manager in Privat Hotel", desc: "Managed daily operations, customer service, and staffing. Maintained high occupancy rates. 🏨" },
        { period: "2007-2014", role: "Individual Entrepreneur", desc: "Worked in the Advertising Realm. 📢" },
        { period: "2005-2007", role: "Manager and Designer", desc: "Oversaw print production workflows and created design layouts. 🎨" },
        { period: "1997-2005", role: "Manager", desc: "Worked in a non-governmental organization. 🤝" }
      ],
      education: [
        { period: "Expected 2025", title: "Meta Front-End Professional Certificate", desc: "React, modern JavaScript, and web accessibility. (Coursera)" },
        { period: "2025", title: "Front-end Development Courses", desc: "Hillel IT School" },
        { period: "1992-1997", title: "Chernihiv Polytechnic University", desc: "Electronics Engineer degree. ⚡" }
      ],
      languages: "English (B1), German (B1). Driver's License Category B. 🚗"
    },
    ua: {
      title: "Лунгу Петро",
      subtitle: "Front-End розробник (React) 👨‍💻",
      summaryTitle: "Професійне резюме 📝",
      summaryText: "Вмотивований фахівець, що переходить у Front-End розробку, з більш ніж 15-річним досвідом у менеджменті та дизайні. Наразі вдосконалюю технічні навички. 🚀",
      skillsTitle: "Технічні навички 🛠️",
      expTitle: "Досвід роботи 💼",
      eduTitle: "Освіта та тренінги 🎓",
      langTitle: "Мови та інфо 🌐",
      experience: [
        { period: "2014-2024", role: "Менеджер у приватному готелі", desc: "Управління операціями, обслуговування клієнтів та підбір персоналу. 🏨" },
        { period: "2007-2014", role: "Приватний підприємець", desc: "Діяльність у сфері реклами. 📢" },
        { period: "2005-2007", role: "Менеджер та дизайнер", desc: "Контроль друкованого виробництва та розробка дизайн-макетів. 🎨" },
        { period: "1997-2005", role: "Менеджер", desc: "Робота в неурядовій організації. 🤝" }
      ],
      education: [
        { period: "Очікується 2025", title: "Meta Front-End Professional Certificate", desc: "React, сучасний JavaScript та веб-доступність. (Coursera)" },
        { period: "2025", title: "Курси Front-end розробки", desc: "IT-школа Hillel" },
        { period: "1992-1997", title: "Чернігівський політехнічний університет", desc: "Диплом інженера-електроніки. ⚡" }
      ],
      languages: "Англійська (B1), Німецька (B1). Посвідчення водія категорії B. 🚗"
    }
  };

  const t = content[lang];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
            {t.title}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 500 }}>
            {t.subtitle}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t.summaryTitle}
          </Typography>
          <Typography variant="body1" textAlign="justify">
            {t.summaryText}
          </Typography>
        </Box>

        {/* Technical Skills */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h5" gutterBottom>
    {t.skillsTitle}
  </Typography>
  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
    {[
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 
      'React', 'Redux Toolkit', 'React Router', 
      'Material UI (MUI)', 'GitHub', 'REST API'
    ].map((skill) => (
      <Chip 
        key={skill} 
        label={skill} 
        color="primary" 
        variant="outlined" 
        sx={{ fontWeight: 'bold', borderRadius: '8px' }} 
      />
    ))}
  </Stack>
</Box>

        {/* Work Experience */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t.expTitle}
          </Typography>
          <List dense>
            {t.experience.map((item, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}><WorkIcon color="primary" /></ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.role} ({item.period})</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">{item.desc}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Education */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {t.eduTitle}
          </Typography>
          <List dense>
            {t.education.map((item, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}><SchoolIcon color="secondary" /></ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.title} — {item.period}</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">{item.desc}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Languages & Additional Info */}
        <Box>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LanguageIcon /> {t.langTitle}
          </Typography>
          <Typography variant="body2">
            {t.languages}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Resume;