-- Seed Data

-- Shows
insert into shows (title, description, slug, image_url) values
('Le Roman de Renart', 'Une adaptation marionnettique des célèbres fables médiévales.', 'le-roman-de-renart', 'https://placehold.co/600x400/7b1113/FFF?text=Renart'),
('Guignol et le Voleur', 'Un classique du théâtre de marionnettes pour les enfants.', 'guignol-et-le-voleur', 'https://placehold.co/600x400/c5a059/FFF?text=Guignol');

-- News
insert into news (title, content, published, image_url) values
('Bienvenue sur le nouveau site !', 'Nous sommes heureux de vous présenter notre nouveau site web. Vous y retrouverez toutes nos actualités et dates de spectacles.', true, 'https://placehold.co/600x400/2c1810/FFF?text=Bienvenue'),
('Nouvelle date pour Renart', 'Retrouvez-nous le 15 Août à la fête médiévale de Provins !', true, null);

-- Agenda
insert into agenda (show_id, date, location, link) values
((select id from shows where slug = 'le-roman-de-renart'), '2025-08-15 14:00:00+00', 'Provins', 'https://provins.net'),
((select id from shows where slug = 'guignol-et-le-voleur'), '2025-09-01 10:00:00+00', 'Parc de la Tête d''Or, Lyon', null);
