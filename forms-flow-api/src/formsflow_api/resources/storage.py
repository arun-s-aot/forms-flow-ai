"""API endpoints for managing file storage API resources."""

from http import HTTPStatus
from flask_restx import Namespace, Resource, cors
from formsflow_api_utils.utils import (
    DESIGNER_GROUP,
    auth,
    cors_preflight,
    profiletime,
)
from flask import Flask, request, jsonify
import boto3
import uuid
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


# # Configure your AWS settings here
AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
AWS_BUCKET_NAME = ''
AWS_REGION = 'ap-southeast-2'

s3_client = boto3.client(
    's3',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

API = Namespace("Storage", description="Storage")

# @cors_preflight("GET, OPTIONS")
# @API.route("/s3", methods=["GET"])
# class FileUploadPresignedURLResource(Resource):
#     """Resource for getting presigned URL."""

#     @staticmethod
#     @cors.crossdomain(origin='*')
#     @profiletime
#     def get():
#         file_name = f'{uuid.uuid4()}.png'
#         # return (
#         #     ({"message": "Welcome to formsflow.ai ssssss API"}),
#         #     HTTPStatus.OK,
#         # )
#         if not file_name:
#             return jsonify({'error': 'File name is required'}), 400

#         try:
#             presigned_url = s3_client.generate_presigned_url(
#                 'put_object',
#                 Params={'Bucket': AWS_BUCKET_NAME, 'Key': file_name},
#                 ExpiresIn=3600
#             )
#             return jsonify({'url': presigned_url})
#         except (NoCredentialsError, PartialCredentialsError) as e:
#             return jsonify({'error': str(e)}), 500



@cors_preflight("GET,OPTIONS")
@API.route("/s3", methods=["GET", "OPTIONS"])
class FormHistoryResource(Resource):
    """Resource for fetching presigned URL."""

    @staticmethod
    @auth.has_one_of_roles([DESIGNER_GROUP])
    @profiletime
    @API.response(200, "OK:- Successful request.")
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
        file_name = f'{uuid.uuid4()}.png'
        # return (
        #     ({"message": "Welcome to formsflow.ai ssssss API"}),
        #     HTTPStatus.OK,
        # )
        if not file_name:
            return jsonify({'error': 'File name is required'}), 400

        try:
            presigned_url = s3_client.generate_presigned_url(
                'put_object',
                Params={'Bucket': AWS_BUCKET_NAME, 'Key': file_name,'ContentType': 'image/jpeg'},
                ExpiresIn=3600
            )
            return jsonify({'presignedUrl': presigned_url})
        except (NoCredentialsError, PartialCredentialsError) as e:
            return jsonify({'error': str(e)}), 500