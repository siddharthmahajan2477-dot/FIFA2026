# Project Structure

```text
FootBallAI
├── .dockerignore
├── .env
├── .env.development
├── .env.example
├── .env.production
├── .github
│   └── workflows
│       ├── ci.yml
│       └── production.yml
├── .gitignore
├── .system_generated (anti 3)
├── .tempmediaStorage (anti 2)
├── COMPONENTS.md
├── DEPLOYMENT_GUIDE.md
├── DOCUMENTATION_INDEX.md
├── FINAL_DELIVERY_SUMMARY.md
├── LICENSE
├── PHASE_6_SUMMARY.md
├── PHASE_7_FRONTEND_EXCELLENCE.md
├── PRODUCTION_CHECKLIST.md
├── PROJECT_STRUCTURE.md
├── README.md
├── api
│   ├── client.ts
│   ├── config.ts
│   ├── http.ts
│   └── routes.ts
├── app
│   ├── ai
│   │   ├── command-center
│   │   │   └── page.tsx
│   │   ├── digital-twin
│   │   │   └── page.tsx
│   │   ├── executive-dashboard
│   │   │   └── page.tsx
│   │   ├── incident-intelligence
│   │   │   └── page.tsx
│   │   ├── intelligence
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── search-reporting
│   │       └── page.tsx
│   ├── auth
│   │   └── page.tsx
│   ├── error.tsx
│   ├── fan-dashboard
│   │   └── page.tsx
│   ├── fan-profile
│   │   └── page.tsx
│   ├── food-beverage
│   │   └── page.tsx
│   ├── globals.css
│   ├── infrastructure
│   │   ├── assets
│   │   │   └── page.tsx
│   │   ├── audit
│   │   │   └── page.tsx
│   │   ├── energy
│   │   │   └── page.tsx
│   │   ├── help
│   │   │   └── page.tsx
│   │   ├── maintenance
│   │   │   └── page.tsx
│   │   ├── organizations
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── parking
│   │   │   └── page.tsx
│   │   ├── rbac
│   │   │   └── page.tsx
│   │   ├── reports
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   ├── sustainability
│   │   │   └── page.tsx
│   │   ├── transportation
│   │   │   └── page.tsx
│   │   ├── users
│   │   │   └── page.tsx
│   │   ├── waste
│   │   │   └── page.tsx
│   │   └── water
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── match-center
│   │   └── page.tsx
│   ├── merchandise
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── operations
│   │   ├── communications
│   │   │   └── page.tsx
│   │   ├── crowd-management
│   │   │   └── page.tsx
│   │   ├── executive
│   │   │   └── page.tsx
│   │   ├── medical
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── sanitation
│   │   │   └── page.tsx
│   │   ├── security
│   │   │   └── page.tsx
│   │   └── volunteer
│   │       └── page.tsx
│   ├── page.tsx
│   ├── player-analytics
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── stadium-navigation
│   │   └── page.tsx
│   ├── team-analytics
│   │   └── page.tsx
│   ├── tickets
│   │   └── page.tsx
│   └── tournament-center
│       └── page.tsx
├── backend
│   ├── Dockerfile
│   ├── alembic
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   │       └── 57d24d3ed05e_initial_schema.py
│   ├── alembic.ini
│   ├── app
│   │   ├── ai
│   │   │   ├── __init__.py
│   │   │   ├── agents.py
│   │   │   ├── gateway.py
│   │   │   ├── memory.py
│   │   │   ├── model_manager.py
│   │   │   └── tools.py
│   │   ├── api
│   │   │   └── v1
│   │   │       ├── __init__.py
│   │   │       ├── admin
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── ai
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── analytics
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── auth
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── health.py
│   │   │       ├── infrastructure
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── matches
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── notifications
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── operations
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       ├── tickets
│   │   │       │   ├── __init__.py
│   │   │       │   └── router.py
│   │   │       └── users
│   │   │           ├── __init__.py
│   │   │           └── router.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── exceptions.py
│   │   │   ├── failover.py
│   │   │   ├── logging.py
│   │   │   ├── prompt_registry.py
│   │   │   ├── provider_config.py
│   │   │   ├── redis_client.py
│   │   │   └── security.py
│   │   ├── database
│   │   │   ├── base.py
│   │   │   ├── database.py
│   │   │   └── session.py
│   │   ├── integrations
│   │   │   ├── __init__.py
│   │   │   ├── analytics
│   │   │   │   ├── __init__.py
│   │   │   │   └── service.py
│   │   │   ├── cache.py
│   │   │   ├── exceptions.py
│   │   │   ├── firebase
│   │   │   │   ├── __init__.py
│   │   │   │   └── service.py
│   │   │   ├── football
│   │   │   │   ├── __init__.py
│   │   │   │   ├── client.py
│   │   │   │   └── service.py
│   │   │   ├── gemini
│   │   │   │   ├── __init__.py
│   │   │   │   ├── client.py
│   │   │   │   └── service.py
│   │   │   ├── schemas.py
│   │   │   └── weather
│   │   │       ├── __init__.py
│   │   │       ├── client.py
│   │   │       └── service.py
│   │   ├── main.py
│   │   ├── middleware
│   │   │   ├── auth.py
│   │   │   ├── logging.py
│   │   │   ├── rate_limit.py
│   │   │   ├── request_id.py
│   │   │   └── security_headers.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── ai
│   │   │   │   └── models.py
│   │   │   ├── analytics
│   │   │   │   └── models.py
│   │   │   ├── auth
│   │   │   │   └── models.py
│   │   │   ├── base.py
│   │   │   ├── base_models.py
│   │   │   ├── commerce
│   │   │   │   └── models.py
│   │   │   ├── football
│   │   │   │   └── models.py
│   │   │   ├── infrastructure
│   │   │   │   └── models.py
│   │   │   ├── navigation
│   │   │   │   └── models.py
│   │   │   ├── notifications
│   │   │   │   └── models.py
│   │   │   ├── operations
│   │   │   │   └── models.py
│   │   │   ├── system
│   │   │   │   └── models.py
│   │   │   ├── tickets
│   │   │   │   └── models.py
│   │   │   └── users
│   │   │       └── models.py
│   │   ├── realtime
│   │   │   ├── __init__.py
│   │   │   ├── dispatcher.py
│   │   │   └── manager.py
│   │   ├── repositories
│   │   │   ├── base.py
│   │   │   └── core.py
│   │   ├── schemas
│   │   │   ├── response.py
│   │   │   └── schemas.py
│   │   ├── services
│   │   │   ├── ai_provider.py
│   │   │   ├── audit.py
│   │   │   ├── communication.py
│   │   │   ├── firebase.py
│   │   │   ├── football.py
│   │   │   ├── navigation.py
│   │   │   ├── payment.py
│   │   │   ├── predictive_ai.py
│   │   │   ├── semantic_search.py
│   │   │   ├── storage.py
│   │   │   └── weather.py
│   │   ├── tasks
│   │   │   ├── celery_app.py
│   │   │   ├── integration_tasks.py
│   │   │   ├── realtime_tasks.py
│   │   │   └── tasks.py
│   │   ├── websocket
│   │   │   ├── connection_manager.py
│   │   │   └── manager.py
│   │   └── workers
│   │       └── celery_app.py
│   ├── requirements.txt
│   ├── scripts
│   │   ├── generate_migration.py
│   │   └── seed_database.py
│   └── tests
│       └── test_auth.py
├── components
│   ├── Countdown.tsx
│   ├── EmptyState.tsx
│   ├── EventTimeline.tsx
│   ├── FirebaseProvider.tsx
│   ├── FloatingNavBar.tsx
│   ├── IntroVideo.tsx
│   ├── LiveIndicator.tsx
│   ├── MatchCard.tsx
│   ├── NewsCard.tsx
│   ├── NotificationCard.tsx
│   ├── PlayerCard.tsx
│   ├── SkeletonLoader.tsx
│   ├── StatCard.tsx
│   ├── TeamCard.tsx
│   ├── TicketCard.tsx
│   ├── TransportCard.tsx
│   ├── WeatherCard.tsx
│   ├── ai
│   │   ├── AIActionCard.tsx
│   │   ├── AnalyticsSummary.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ConfidenceBadge.tsx
│   │   ├── DigitalTwinCard.tsx
│   │   ├── ExecutiveKPI.tsx
│   │   ├── ForecastChart.tsx
│   │   ├── HealthScoreCard.tsx
│   │   ├── InsightCard.tsx
│   │   ├── NotificationCard.tsx
│   │   ├── PredictionCard.tsx
│   │   ├── RecommendationCard.tsx
│   │   ├── RiskIndicator.tsx
│   │   ├── SearchResultCard.tsx
│   │   └── TimelineCard.tsx
│   ├── empty-states
│   │   └── EnhancedEmptyState.tsx
│   ├── infrastructure
│   │   ├── AssetCard.tsx
│   │   ├── AuditTimeline.tsx
│   │   ├── EnergyCard.tsx
│   │   ├── KPIWidget.tsx
│   │   ├── MaintenanceCard.tsx
│   │   ├── ParkingCard.tsx
│   │   ├── PermissionMatrix.tsx
│   │   ├── SettingsPanel.tsx
│   │   ├── StatusIndicator.tsx
│   │   ├── UserCard.tsx
│   │   ├── WasteCard.tsx
│   │   └── WaterCard.tsx
│   ├── layout
│   │   ├── GridLayout.tsx
│   │   ├── PageLayout.tsx
│   │   └── SectionLayout.tsx
│   ├── maps
│   │   ├── IndoorMap.tsx
│   │   ├── NavigationMap.tsx
│   │   ├── OperationsMap.tsx
│   │   ├── StadiumMap.tsx
│   │   └── index.ts
│   ├── ops
│   │   ├── AlertBanner.tsx
│   │   ├── AreaStatusGrid.tsx
│   │   ├── IncidentCard.tsx
│   │   ├── KPICard.tsx
│   │   ├── StaffTable.tsx
│   │   ├── StatusBadge.tsx
│   │   └── TaskCard.tsx
│   ├── skeletons
│   │   └── DashboardSkeleton.tsx
│   ├── states
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   └── OfflineState.tsx
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── switch.tsx
│       └── table.tsx
├── components.json
├── context
│   └── AuthProvider.tsx
├── docker-compose.yml
├── hooks
│   ├── useAnalytics.ts
│   ├── useAuth.ts
│   ├── useDashboard.ts
│   ├── useFirebase.ts
│   ├── useInfrastructure.ts
│   ├── useMatches.ts
│   ├── useNotifications.ts
│   ├── usePlayer.ts
│   ├── useStadiumMap.ts
│   ├── useTeam.ts
│   ├── useTickets.ts
│   └── useWebSocket.ts
├── lib
│   ├── a11y
│   │   └── index.ts
│   ├── constants
│   │   └── index.ts
│   ├── firebase-admin.ts
│   ├── firebase-analytics.ts
│   ├── firebase.ts
│   ├── hooks
│   │   ├── useAsync.ts
│   │   ├── useMediaQuery.ts
│   │   └── usePrevious.ts
│   ├── leaflet-css.ts
│   ├── map-utils.ts
│   ├── mock-data
│   ├── styles
│   │   └── adaptive-glass.css
│   ├── tokens
│   │   └── spacing.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── format.ts
│   │   └── validation.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── print_tree.py
├── public
│   ├── Football2026.mp4
│   ├── apple-icon.png
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   ├── robots.txt
│   └── stadium-bg.png
├── scripts
│   └── refactor_services.py
├── services
│   ├── ai.service.ts
│   ├── analytics.service.ts
│   ├── auth.service.ts
│   ├── auth.ts
│   ├── food.service.ts
│   ├── infrastructure.service.ts
│   ├── match.service.ts
│   ├── merchandise.service.ts
│   ├── navigation.service.ts
│   ├── notification.service.ts
│   ├── operations.service.ts
│   ├── payment.service.ts
│   ├── player.service.ts
│   ├── team.service.ts
│   ├── ticket.service.ts
│   ├── user.service.ts
│   └── weather.service.ts
├── stadium_os_specs (anti 1)
│   ├── accessibility_inclusive_design.md
│   ├── accessibility_inclusive_design.md.metadata.json
│   ├── ai_assistant_design.md
│   ├── ai_assistant_design.md.metadata.json
│   ├── ai_copilot_sidebar_1783459305771.png
│   ├── ai_response_1783680387600.png
│   ├── ai_workspace_fullscreen_1783459320985.png
│   ├── application_shell_spec.md
│   ├── application_shell_spec.md.metadata.json
│   ├── asset_management_design.md
│   ├── asset_management_design.md.metadata.json
│   ├── authentication_login_screen_1783458644177.png
│   ├── communication_collaboration_design.md
│   ├── communication_collaboration_design.md.metadata.json
│   ├── component_library.md
│   ├── component_library.md.metadata.json
│   ├── dashboard_content_strategy.md
│   ├── dashboard_content_strategy.md.metadata.json
│   ├── design_system.md
│   ├── design_system.md.metadata.json
│   ├── desktop_application_shell_1783458520048.png
│   ├── digital_twin_3d_viewport_1783459351375.png
│   ├── digital_twin_design.md
│   ├── digital_twin_design.md.metadata.json
│   ├── digital_twin_timeline_replay_1783459366378.png
│   ├── emergency_command_center_1783459058082.png
│   ├── emergency_operations_design.md
│   ├── emergency_operations_design.md.metadata.json
│   ├── emergency_responder_pwa_1783459070140.png
│   ├── enterprise_domain_model.md
│   ├── enterprise_domain_model.md.metadata.json
│   ├── enterprise_integration_architecture.md
│   ├── enterprise_integration_architecture.md.metadata.json
│   ├── event_driven_architecture.md
│   ├── event_driven_architecture.md.metadata.json
│   ├── executive_analytics_dashboard_1783459478175.png
│   ├── executive_decision_design.md
│   ├── executive_decision_design.md.metadata.json
│   ├── fan_matchday_dashboard_1783458703694.png
│   ├── fan_matchday_design.md
│   ├── fan_matchday_design.md.metadata.json
│   ├── fan_pwa_view_1783680331919.png
│   ├── fan_stadium_map_1783458717426.png
│   ├── implementation_blueprint.md
│   ├── implementation_blueprint.md.metadata.json
│   ├── implementation_plan.md
│   ├── implementation_plan.md.metadata.json
│   ├── initial_load_1783680261996.png
│   ├── interaction_framework.md
│   ├── interaction_framework.md.metadata.json
│   ├── inventory_resource_design.md
│   ├── inventory_resource_design.md.metadata.json
│   ├── it_admin_view_1783680347263.png
│   ├── landing_page_hero_1783458629289.png
│   ├── master_development_constitution.md
│   ├── master_development_constitution.md.metadata.json
│   ├── media__1783450385916.png
│   ├── media__1783450406238.png
│   ├── media__1783450406247.jpg
│   ├── mobile_pwa_shell_1783458534937.png
│   ├── motion_design_system.md
│   ├── motion_design_system.md.metadata.json
│   ├── navigation_shell_architecture.md
│   ├── navigation_shell_architecture.md.metadata.json
│   ├── nfr_quality_architecture.md
│   ├── nfr_quality_architecture.md.metadata.json
│   ├── onboarding_authentication_design.md
│   ├── onboarding_authentication_design.md.metadata.json
│   ├── operations_command_center_1783458908816.png
│   ├── operations_command_design.md
│   ├── operations_command_design.md.metadata.json
│   ├── operations_diagnostics_detail_1783458921636.png
│   ├── page_templates_blueprints.md
│   ├── page_templates_blueprints.md.metadata.json
│   ├── parking_operations_design.md
│   ├── parking_operations_design.md.metadata.json
│   ├── platform_administration_design.md
│   ├── platform_administration_design.md.metadata.json
│   ├── platform_governance_design.md
│   ├── platform_governance_design.md.metadata.json
│   ├── product_requirements_specification.md
│   ├── product_requirements_specification.md.metadata.json
│   ├── responsive_layout_architecture.md
│   ├── responsive_layout_architecture.md.metadata.json
│   ├── screen_inventory_mapping.md
│   ├── screen_inventory_mapping.md.metadata.json
│   ├── security_governance_architecture.md
│   ├── security_governance_architecture.md.metadata.json
│   ├── stadium_commerce_design.md
│   ├── stadium_commerce_design.md.metadata.json
│   ├── stadium_os_demo_1783680236421.webp
│   ├── state_management_design.md
│   ├── state_management_design.md.metadata.json
│   ├── system_monitoring_design.md
│   ├── system_monitoring_design.md.metadata.json
│   ├── task.md
│   ├── task.md.metadata.json
│   ├── transportation_mobility_design.md
│   ├── transportation_mobility_design.md.metadata.json
│   ├── ux_audit_validation.md
│   ├── ux_audit_validation.md.metadata.json
│   ├── ux_ia_blueprint.md
│   ├── ux_ia_blueprint.md.metadata.json
│   ├── ux_visual_architecture.md
│   ├── ux_visual_architecture.md.metadata.json
│   ├── volunteer_task_dashboard_1783458982881.png
│   ├── volunteer_workforce_design.md
│   ├── volunteer_workforce_design.md.metadata.json
│   ├── walkthrough.md
│   ├── walkthrough.md.metadata.json
│   └── workforce_assignment_board_1783458997695.png
├── test_redis.py
├── tsconfig.json
└── types
    ├── analytics.ts
    ├── infrastructure.ts
    ├── map.ts
    ├── match.ts
    ├── notification.ts
    ├── operations.ts
    ├── orders.ts
    ├── player.ts
    ├── team.ts
    ├── ticket.ts
    └── user.ts
```
