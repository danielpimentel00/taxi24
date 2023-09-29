--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: conductor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.conductor (id, fullname, "isAvailable", latitude, longitude) VALUES (1, 'Juan Pérez', true, 18.45116457482549800, -69.95263650676901000);
INSERT INTO public.conductor (id, fullname, "isAvailable", latitude, longitude) VALUES (2, 'María González', false, 18.45657712855636500, -69.93716358460193000);
INSERT INTO public.conductor (id, fullname, "isAvailable", latitude, longitude) VALUES (3, 'Carlos Rodríguez', true, 18.45935648179708400, -69.95664610078988000);
INSERT INTO public.conductor (id, fullname, "isAvailable", latitude, longitude) VALUES (4, 'Ana Martínez', true, 18.46389111927305400, -69.93479895228390000);
INSERT INTO public.conductor (id, fullname, "isAvailable", latitude, longitude) VALUES (5, 'Luis Fernández', false, 18.44497162403079600, -69.94374343194433000);


--
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.factura (id, "idViaje", "totalItbis", "subTotal", total) VALUES (1, 2, 54.03, 300.15, 354.18);
INSERT INTO public.factura (id, "idViaje", "totalItbis", "subTotal", total) VALUES (2, 4, 72.05, 400.30, 472.35);


--
-- Data for Name: pasajero; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pasajero (id, fullname) VALUES (1, 'Luisa Martínez');
INSERT INTO public.pasajero (id, fullname) VALUES (2, 'Carlos Sánchez');
INSERT INTO public.pasajero (id, fullname) VALUES (3, 'Isabel González');
INSERT INTO public.pasajero (id, fullname) VALUES (4, 'Javier Ramírez');
INSERT INTO public.pasajero (id, fullname) VALUES (5, 'Sofía Torres');


--
-- Data for Name: viaje; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.viaje (id, "isActive", monto, "idConductor", "idPasajero") VALUES (1, false, 250.25, 1, 1);
INSERT INTO public.viaje (id, "isActive", monto, "idConductor", "idPasajero") VALUES (2, false, 300.15, 2, 4);
INSERT INTO public.viaje (id, "isActive", monto, "idConductor", "idPasajero") VALUES (3, true, 300.15, 5, 4);
INSERT INTO public.viaje (id, "isActive", monto, "idConductor", "idPasajero") VALUES (4, false, 400.30, 2, 5);


--
-- Name: conductor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.conductor_id_seq', 5, true);


--
-- Name: factura_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.factura_id_seq', 2, true);


--
-- Name: pasajero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pasajero_id_seq', 5, true);


--
-- Name: viaje_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.viaje_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

