"""API endpoints for managing healthcheckpoint API resource."""

from http import HTTPStatus

from flask_restx import Namespace, Resource
from formsflow_api_utils.utils import cors_preflight, profiletime

API = Namespace("Checkpoint", description="Checkpoint")


@cors_preflight("GET")
@API.route("", methods=["GET"])
class HealthCheckpointResource(Resource):
    """Resource for managing healthcheckpoint."""

    @staticmethod
    @profiletime
    def get():
        """Get the status of API."""
        return (
            ({"message": "Welcome to formsflow.ai API"}),
            HTTPStatus.OK,
        )



@cors_preflight("GET,OPTIONS")
@API.route("/1", methods=["GET", "OPTIONS"])
class FormHistoryResource(Resource):
    """Resource for form history."""

    @staticmethod
    @profiletime
    @API.response(
        400,
        "BAD_REQUEST:- Invalid request.",
    )
    @API.response(
        401,
        "UNAUTHORIZED:- Authorization header not provided or an invalid token passed.",
    )
    @API.response(
        403,
        "FORBIDDEN:- Authorization will not help.",
    )
    def get():
        """Getting form history."""
        return 'sss'