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

DROP DATABASE IF EXISTS taxi24;
--
-- Name: taxi24; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE taxi24 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


\connect taxi24

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
-- Name: conductor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conductor (
    id integer NOT NULL,
    fullname character varying(150) NOT NULL,
    "isAvailable" boolean NOT NULL,
    latitude numeric(20,17) NOT NULL,
    longitude numeric(20,17) NOT NULL
);


--
-- Name: conductor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.conductor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: conductor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.conductor_id_seq OWNED BY public.conductor.id;


--
-- Name: factura; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.factura (
    id integer NOT NULL,
    "idViaje" integer NOT NULL,
    "totalItbis" numeric(10,2) NOT NULL,
    "subTotal" numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL
);


--
-- Name: factura_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.factura_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: factura_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.factura_id_seq OWNED BY public.factura.id;


--
-- Name: pasajero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pasajero (
    id integer NOT NULL,
    fullname character varying(150) NOT NULL
);


--
-- Name: pasajero_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pasajero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pasajero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pasajero_id_seq OWNED BY public.pasajero.id;


--
-- Name: viaje; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.viaje (
    id integer NOT NULL,
    "isActive" boolean NOT NULL,
    monto numeric(10,2) NOT NULL,
    "idConductor" integer,
    "idPasajero" integer
);


--
-- Name: viaje_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.viaje_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: viaje_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.viaje_id_seq OWNED BY public.viaje.id;


--
-- Name: conductor id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conductor ALTER COLUMN id SET DEFAULT nextval('public.conductor_id_seq'::regclass);


--
-- Name: factura id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.factura ALTER COLUMN id SET DEFAULT nextval('public.factura_id_seq'::regclass);


--
-- Name: pasajero id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pasajero ALTER COLUMN id SET DEFAULT nextval('public.pasajero_id_seq'::regclass);


--
-- Name: viaje id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.viaje ALTER COLUMN id SET DEFAULT nextval('public.viaje_id_seq'::regclass);


--
-- Name: conductor PK_081ad11134847923a19823b64bd; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conductor
    ADD CONSTRAINT "PK_081ad11134847923a19823b64bd" PRIMARY KEY (id);


--
-- Name: pasajero PK_1c14b70eee3fb51dcd1cd3506f4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pasajero
    ADD CONSTRAINT "PK_1c14b70eee3fb51dcd1cd3506f4" PRIMARY KEY (id);


--
-- Name: factura PK_ca804984009ea42a7b46adb9a86; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT "PK_ca804984009ea42a7b46adb9a86" PRIMARY KEY (id);


--
-- Name: viaje PK_fd7cbfd18685285e2521ec59076; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT "PK_fd7cbfd18685285e2521ec59076" PRIMARY KEY (id);


--
-- Name: factura UQ_5a3c00456c5e893ed484e550eb2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT "UQ_5a3c00456c5e893ed484e550eb2" UNIQUE ("idViaje");


--
-- Name: viaje FK_39880185885d4d6550bb88255ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT "FK_39880185885d4d6550bb88255ce" FOREIGN KEY ("idConductor") REFERENCES public.conductor(id);


--
-- Name: factura FK_5a3c00456c5e893ed484e550eb2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT "FK_5a3c00456c5e893ed484e550eb2" FOREIGN KEY ("idViaje") REFERENCES public.viaje(id);


--
-- Name: viaje FK_bfafd85fd10d6df3a62e62d7a70; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT "FK_bfafd85fd10d6df3a62e62d7a70" FOREIGN KEY ("idPasajero") REFERENCES public.pasajero(id);


--
-- PostgreSQL database dump complete
--

